import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private config: ConfigService) {
    super({
      // Откуда брать токен (из заголовка Authorization: Bearer ...)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Секрет для проверки подписи токена
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  // Метод, который вызывается после валидации токена
  async validate(payload: any) {
    return { 
      sub: payload.sub, 
      email: payload.email,
      username: payload.username,
    };
  }
}