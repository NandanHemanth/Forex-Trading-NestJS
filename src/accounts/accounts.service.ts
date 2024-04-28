import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
  private balances: { [currency: string]: number } = {
    USD: 1000,
    EUR: 500,
    GBP: 300,
  };

  topUpAccount(currency: string, amount: number): void {
    if (this.balances[currency]) {
      this.balances[currency] += amount;
    } else {
      this.balances[currency] = amount;
    }
  }

  getBalances(): { [currency: string]: number } {
    return this.balances;
  }
}