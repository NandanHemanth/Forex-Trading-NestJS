import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('topup')
  topUpAccount(@Body() body: { currency: string; amount: number }) {
    this.accountsService.topUpAccount(body.currency, body.amount);
  }

  @Get('balance')
  getBalances() {
    return { balances: this.accountsService.getBalances() };
  }
}