import { Controller, Get } from '@nestjs/common';
import { FxRatesService } from './fx-rates.service';

@Controller('fx-rates')
export class FxRatesController {
  constructor(private fxRatesService: FxRatesService) {}

  @Get()
  getRates() {
    return this.fxRatesService.getRates();
  }
}