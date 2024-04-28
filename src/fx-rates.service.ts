import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class FxRatesService {
  private apiKey = 'ARQRE1IJ0BLY95YX';
  private rates: { [key: string]: { rate: number; expiresAt: number } } = {};

  constructor(private httpService: HttpService) {
    this.fetchRates();
    setInterval(() => this.fetchRates(), 30000); // Fetch new rates every 30 seconds
  }

  private async fetchRates() {
    const response = await lastValueFrom(
      this.httpService.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&apikey=${this.apiKey}`),
    );
    const data = response.data['Realtime Currency Exchange Rate'];
    for (const [currency, rate] of Object.entries(data['5. Exchange Rate'])) {
      this.rates[currency] = {
        rate: parseFloat(rate['5. Exchange Rate']),
        expiresAt: Date.now() + 30000, // Expire in 30 seconds
      };
    }
  }

  getRates() {
    const quoteId = Math.floor(Math.random() * 1000000).toString(); // Generate a random quoteId
    const expiresAt = Math.max(...Object.values(this.rates).map((rate) => rate.expiresAt));
    return { quoteId, rates: this.rates, expiresAt };
  }
} 