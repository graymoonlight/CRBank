import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Accounts')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer токен',
  required: true,
})
@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Создать счет (FIAT или CRYPTO)' })
  @ApiResponse({ status: 201, description: 'Счет успешно создан' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  createAccount(@Request() req: any, @Body() dto: CreateAccountDto) {
    return this.accountsService.createAccount(req.user.sub, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список счетов пользователя' })
  @ApiResponse({ status: 200, description: 'Список счетов' })
  getAccounts(@Request() req: any) {
    return this.accountsService.getUserAccounts(req.user.sub);
  }

  @Post('deposit')
  @ApiOperation({ summary: 'Пополнить баланс счета' })
  @ApiResponse({ status: 200, description: 'Баланс успешно пополнен' })
  deposit(@Body() dto: DepositDto) {
    return this.accountsService.deposit(dto);
  }

  @Post('withdraw')
  @ApiOperation({ summary: 'Вывести средства со счета' })
  @ApiResponse({ status: 200, description: 'Средства успешно выведены' })
  @ApiResponse({ status: 403, description: 'Недостаточно средств или доступ запрещен' })
  withdraw(@Request() req: any, @Body() dto: WithdrawDto) {
    return this.accountsService.withdraw(req.user.sub, dto);
  }
}
