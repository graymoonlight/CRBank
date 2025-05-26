import { Injectable, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService, private blockchainService: BlockchainService) {}

  // Создание счета
    async createAccount(userId: string, dto: CreateAccountDto) {
        if (dto.type === 'FIAT' && !['USD', 'EUR'].includes(dto.currency)) {
            throw new BadRequestException('Неверная валюта для FIAT-счета');
        }
        if (dto.type === 'CRYPTO' && !['TON', 'BTC', 'ETH'].includes(dto.currency)) {
        throw new BadRequestException('Неверная валюта для CRYPTO-счета');
        }

        const account = await this.prisma.account.create({ 
            data: { userId, ...dto } 
        });

        // Генерация кошелька для крипто-аккаунта
        if (dto.type === 'CRYPTO') {
            const wallet = await this.blockchainService.generateTonWallet();
            await this.prisma.cryptoWallet.create({
                data: {
                    accountId: account.id,
                    address: wallet.address,
                    network: wallet.network,
                    encryptedKey: wallet.encryptedPrivateKey,
                },
            });
        }

        return account;
    }

  // Получение всех счетов пользователя
  async getUserAccounts(userId: string) {
    return this.prisma.account.findMany({
      where: { userId },
      include: {
        cryptoWallet: true,
        fiatDetails: true,
      },
    });
  }

  // Пополнение баланса
  async deposit(dto: DepositDto) {
    return this.prisma.account.update({
      where: { id: dto.accountId },
      data: {
        balance: { increment: dto.amount },
      },
    });
  }

  // Вывод средств
  async withdraw(userId: string, dto: WithdrawDto) {
    const account = await this.prisma.account.findUnique({
      where: { id: dto.accountId },
    });

    // 1. Проверка на существование аккаунта
    if (!account) {
      throw new NotFoundException('Счет не найден');
    }

    // 2. Проверка владельца счета
    if (account.userId !== userId) {
      throw new ForbiddenException('Доступ запрещен');
    }

    // 3. Проверка баланса
    if (account.balance < dto.amount) {
      throw new ForbiddenException('Недостаточно средств');
    }

    // 4. Обновление баланса
    return this.prisma.account.update({
      where: { id: dto.accountId },
      data: {
        balance: { decrement: dto.amount },
      },
    });
  }
}
