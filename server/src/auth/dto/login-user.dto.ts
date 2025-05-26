import { MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Имя пользователя для входа',
    example: 'john_doe',
    minLength: 3,
  })
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @MinLength(3, { message: 'Имя пользователя должно содержать минимум 3 символа' })
  username: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'strongPassword123',
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;
}