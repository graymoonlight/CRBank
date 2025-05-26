import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { AccountsModule } from './accounts/accounts.module';
import { BlockchainModule } from './blockchain/blockchain.module';

@Module({
  imports: [
    AccountsModule,
    AuthModule,
    UsersModule,
    BlockchainModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),],
  providers: [PrismaService],
})
export class AppModule {}
