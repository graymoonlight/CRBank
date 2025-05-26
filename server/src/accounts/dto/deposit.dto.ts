import { IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {
  @ApiProperty({
    description: 'UUID счета, на который производится пополнение',
    example: 'eb5e523b-b165-428d-8d4b-6aa67bb614f1',
  })
  @IsUUID()
  accountId: string;

  @ApiProperty({
    description: 'Сумма пополнения, должна быть больше нуля',
    example: 100.50,
  })
  @IsPositive({ message: 'Сумма пополнения должна быть больше нуля' })
  amount: number;
}
