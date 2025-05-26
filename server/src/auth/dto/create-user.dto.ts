import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя, минимум 8 символов',
    example: 'strongPassword123',
  })
  @IsString()
  @MinLength(8, { message: 'Пароль должен быть минимум 8 символов' })
  password: string;

  @ApiProperty({
    description: 'Имя пользователя (никнейм)',
    example: 'john_doe',
  })
  @IsString()
  username: string;
}
