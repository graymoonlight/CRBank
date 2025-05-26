import { Injectable } from '@nestjs/common';;
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto-js';
import { Address, TonClient4, WalletContractV4, internal, toNano } from '@ton/ton';
import { mnemonicToPrivateKey, mnemonicNew } from '@ton/crypto';
import { BlockchainNetwork, GenerateWalletResponse } from './dto/blockchain.types';

@Injectable()
export class BlockchainService {
  private readonly encryptionKey: string;
  private readonly tonClient: TonClient4;

  constructor(private configService: ConfigService) {
    const secret = this.configService.get<string>('ENCRYPTION_SECRET');
    if (!secret) throw new Error('ENCRYPTION_SECRET is not defined');

    this.encryptionKey = secret;

    this.tonClient = new TonClient4({
      endpoint: this.configService.get('TON_ENDPOINT') || 'https://testnet-v4.tonhubapi.com',
    });
  }

  // Генерация кошелька TON
  async generateTonWallet(): Promise<GenerateWalletResponse> {
    const mnemonicArray = await this.generateMnemonic();
    const keyPair = await mnemonicToPrivateKey(mnemonicArray);

    const wallet = WalletContractV4.create({
      workchain: 0,
      publicKey: keyPair.publicKey,
    });

    return {
      address: wallet.address.toString(),
      encryptedPrivateKey: await this.encrypt(keyPair.secretKey.toString('hex')),
      network: 'TON' as BlockchainNetwork,
      mnemonic: mnemonicArray.join(' '),
      publicKey: keyPair.publicKey.toString('hex'),
    };
  }

  // Отправка TON
  async sendTON(encryptedKey: string, toAddress: string, amount: number): Promise<string> {
    const secretKeyHex = await this.decryptKey(encryptedKey);
    const secretKey = Buffer.from(secretKeyHex, 'hex');

    const wallet = WalletContractV4.create({
      workchain: 0,
      publicKey: secretKey.subarray(32),
    });

    const contract = this.tonClient.open(wallet);
    const seqno = await contract.getSeqno();

    const transfer = await contract.createTransfer({
      seqno,
      secretKey,
      messages: [
        internal({
          to: Address.parse(toAddress),
          value: toNano(amount).toString(),
          body: 'CryptoBank Transaction',
        }),
      ],
    });

    await contract.send(transfer);
    return transfer.hash().toString('hex');
  }

  // Получение баланса
  async getBalance(address: string): Promise<number> {
    const lastBlock = await this.tonClient.getLastBlock();
    const accountLite = await this.tonClient.getAccountLite(lastBlock.last.seqno, Address.parse(address));
    return Number(accountLite.account.balance.coins) / 1e9;
  }

  // Деплой контракта Tact
  async deployTactContract(tsPath: string, initData: any): Promise<string> {
    const { createTactContract } = await import(tsPath);

    const contract = await createTactContract(initData);

    const walletMnemonic = await this.generateMnemonic();
    const keyPair = await mnemonicToPrivateKey(walletMnemonic);
    const wallet = WalletContractV4.create({ workchain: 0, publicKey: keyPair.publicKey });
    const sender = this.tonClient.open(wallet);

    const senderSeqno = await sender.getSeqno();

    const deployMessage = await sender.createTransfer({
      seqno: senderSeqno,
      secretKey: keyPair.secretKey,
      messages: [internal({
        to: contract.address,
        value: toNano(0.1).toString(),
        init: {
          code: contract.code,
          data: contract.data,
        },
      })],
    });

    await sender.send(deployMessage);

    return contract.address.toString();
  }

  // Валидация мнемоники
  async validateMnemonic(mnemonic: string, encryptedKey: string): Promise<boolean> {
    try {
      const keyPair = await mnemonicToPrivateKey(mnemonic.split(' '));
      const testEncrypted = await this.encrypt(keyPair.secretKey.toString('hex'));
      return testEncrypted === encryptedKey;
    } catch {
      return false;
    }
  }

  // Генерация мнемоники
  private async generateMnemonic(): Promise<string[]> {
    return mnemonicNew(24);
  }

  // Шифрование
  private async encrypt(data: string): Promise<string> {
    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
  }

  // Дешифрование
  private async decryptKey(encryptedData: string): Promise<string> {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) throw new Error('Failed to decrypt data');
    return decrypted;
  }

  // Тест: шифрование/дешифрование
  async testEncryptionCycle(data: string) {
    const encrypted = await this.encrypt(data);
    const decrypted = await this.decryptKey(encrypted);
    return { encrypted, decrypted };
  }
}
