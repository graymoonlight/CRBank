import { IsEnum, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccountType } from '@prisma/client';
import { CurrencyValidator } from '../validators/currency.validator';

export class CreateAccountDto {
  @ApiProperty({
    description: 'Тип счета',
    enum: AccountType,
    example: AccountType.CRYPTO,
  })
  @IsEnum(AccountType)
  type: AccountType;

  @ApiProperty({
    description: 'Валюта счета. Валидируется кастомным валидатором CurrencyValidator',
    example: 'TON',
  })
  @Validate(CurrencyValidator)
  currency: string;
}
