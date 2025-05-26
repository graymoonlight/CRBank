import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Email пользователя для восстановления пароля',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Введите корректный email' })
  email: string;
}
