import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AccountsModule } from './accounts/accounts.module';
import { FxRatesService } from './fx-rates.service';
import { FxRatesController } from './fx-rates.controller';
import { FxConversionService } from './fx-conversion.service';
import { FxConversionController } from './fx-conversion.controller';

@Module({
  imports: [AccountsModule, HttpModule],
  controllers: [FxRatesController, FxConversionController],
  providers: [FxRatesService, FxConversionService],
})
export class AppModule {}