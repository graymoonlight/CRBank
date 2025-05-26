import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { BlockchainService } from 'src/blockchain/blockchain.service';
import { CurrencyValidator } from './validators/currency.validator';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, PrismaService, BlockchainService, CurrencyValidator],
})
export class AccountsModule {}