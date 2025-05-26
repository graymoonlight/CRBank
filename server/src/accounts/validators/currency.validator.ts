import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'CurrencyValidator', async: false })
export class CurrencyValidator implements ValidatorConstraintInterface {
  validate(currency: string, args: ValidationArguments) {
    const { object } = args;
    const type = (object as any).type;

    if (!type) return false;

    if (type === 'FIAT') {
      return ['USD', 'EUR'].includes(currency);
    }

    if (type === 'CRYPTO') {
      return ['TON', 'BTC', 'ETH'].includes(currency);
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const { object } = args;
    const type = (object as any).type;
    
    if (type === 'FIAT') {
      return 'Для FIAT-счетов доступны только USD или EUR';
    }
    
    if (type === 'CRYPTO') {
      return 'Для CRYPTO-счетов доступны TON, BTC, ETH';
    }
    
    return 'Неверный тип счета';
  }
}