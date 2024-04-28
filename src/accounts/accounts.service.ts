// Importing required modules
import { Injectable } from '@nestjs/common';

// 
@Injectable()
export class AccountsService {
  // Defining the basic wallet
  private balances: { [currency: string]: number } = {
    USD: 1000,
    EUR: 500,
    GBP: 300,
  };

  // Adding specified Amount to the specified currency of the wallet
  topUpAccount(currency: string, amount: number): void {
    if (this.balances[currency]) {
      this.balances[currency] += amount;
    } else {
      this.balances[currency] = amount;
    }
  }

  // Returns the balance with all the currencies
  getBalances(): { [currency: string]: number } {
    return this.balances;
  }
}