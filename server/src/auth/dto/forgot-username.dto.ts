import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotUsernameDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email, связанный с аккаунтом',
  })
  @IsEmail({}, { message: 'Некорректный формат email' })
  email: string;
}