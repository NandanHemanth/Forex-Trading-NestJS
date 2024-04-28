// Importing the modules, Controllers & services
import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

// Defining the Module decorator with the metadata
@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}