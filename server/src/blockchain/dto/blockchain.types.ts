export type BlockchainNetwork = 'TON';

export interface GenerateWalletResponse {
  address: string;
  encryptedPrivateKey: string;
  network: BlockchainNetwork;
  mnemonic?: string; // Только для тестовых целей
  publicKey: string;
}