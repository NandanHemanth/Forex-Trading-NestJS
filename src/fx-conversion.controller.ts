import { Body, Controller, Post } from '@nestjs/common';
import { FxConversionService } from './fx-conversion.service';
import { FxRatesService } from './fx-rates.service';

@Controller('fx-conversion')
export class FxConversionController {
  constructor(
    private fxConversionService: FxConversionService,
    private fxRatesService: FxRatesService,
  ) {}

  @Post()
  convert(@Body() body: { quoteId: string; fromCurrency: string; toCurrency: string; amount: number }) {
    const { quoteId, rates, expiresAt } = this.fxRatesService.getRates();
    if (quoteId !== body.quoteId || Date.now() > expiresAt) {
      throw new Error('Invalid or expired quote');
    }
    return this.fxConversionService.convert(body.quoteId, body.fromCurrency, body.toCurrency, body.amount, rates);
  }
}