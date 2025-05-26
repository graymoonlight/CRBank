import { IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WithdrawDto {
  @ApiProperty({
    description: 'UUID счета, с которого производится вывод средств',
    example: 'eb5e523b-b165-428d-8d4b-6aa67bb614f1',
  })
  @IsUUID()
  accountId: string;

  @ApiProperty({
    description: 'Сумма вывода, должна быть больше нуля',
    example: 50.75,
  })
  @IsPositive({ message: 'Сумма вывода должна быть больше нуля' })
  amount: number;
}
