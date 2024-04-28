// Importing Functions & modules 
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AccountsModule } from './accounts/accounts.module';
import { FxRatesService } from './fx-rates.service';
import { FxRatesController } from './fx-rates.controller';
import { FxConversionService } from './fx-conversion.service';
import { FxConversionController } from './fx-conversion.controller';

// Module decorator to define all the module metadata
@Module({
  imports: [AccountsModule, HttpModule], // Modules that provide metadata used to organise application structure
  controllers: [FxRatesController, FxConversionController], // Controllers used for  handling incoming requests, outgoing responses and route management
  providers: [FxRatesService, FxConversionService], // Service which handle the core functionality & business logic of the incoming requests
})
export class AppModule {}