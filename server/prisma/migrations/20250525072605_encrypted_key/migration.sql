/*
  Warnings:

  - Added the required column `encryptedKey` to the `CryptoWallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CryptoWallet" ADD COLUMN     "encryptedKey" TEXT NOT NULL;
