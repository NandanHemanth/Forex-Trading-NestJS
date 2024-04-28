import { Injectable } from '@nestjs/common';

@Injectable()
export class FxConversionService {
  convert(quoteId: string, fromCurrency: string, toCurrency: string, amount: number, rates: any) {
    const rate = rates[`${fromCurrency}${toCurrency}`];
    if (!rate) {
      throw new Error('Invalid currency pair');
    }
    const convertedAmount = amount * rate.rate;
    return { convertedAmount, currency: toCurrency };
  }
}