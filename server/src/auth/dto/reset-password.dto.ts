import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Токен для сброса пароля, полученный по email',
    example: 'd7f8e2c9-3a7f-4e5a-8f1b-0c7a9b5f3d12',
  })
  @IsString({ message: 'Токен должен быть строкой' })
  token: string;

  @ApiProperty({
    description: 'Новый пароль пользователя (минимум 8 символов)',
    example: 'newStrongPassword123',
    minLength: 8,
  })
  @IsString({ message: 'Новый пароль должен быть строкой' })
  @MinLength(8, { message: 'Новый пароль должен содержать минимум 8 символов' })
  newPassword: string;
}
