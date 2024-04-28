// Importing the necessary libraries & services
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

// The Controller decorator specifies the base URL "/accounts" which handles incoming requests & manages routes
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  // Handles HTTP POST requests to '/accounts/topup' endpoint.
  @Post('topup')
  topUpAccount(@Body() body: { currency: string; amount: number }) {
    this.accountsService.topUpAccount(body.currency, body.amount);
  }

  // Handles HTTP GET requests to '/accounts/balance' endpoint.
  @Get('balance')
  getBalances() {
    return { balances: this.accountsService.getBalances() };
  }
}