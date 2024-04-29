import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class FxRatesService {
  private apiKey = 'GF4OH829SV9XJLIJ';
  private rates: { [currency: string]: { rate: number; expiresAt: number } } = {};

  constructor(private httpService: HttpService) {
    this.fetchRates();
    setInterval(() => this.fetchRates(), 30000); // Fetch new rates every 30 seconds
  }

  private async fetchRates() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_symbol=USD&to_symbol=EUR&apikey=${this.apiKey}`),
      );
      console.log(response.data)

      const data = response.data['Time Series FX (Daily)'];
      if (!data) {
        throw new Error('Unexpected response format: Time Series FX (Monthly) not found');
      }

      const latestRate = data[Object.keys(data)[0]];
      const rate = parseFloat(latestRate['4. close']); 

      const expiresAt = Date.now() + 30000; // Expire in 30 seconds

      this.rates['EUR'] = {
        rate,
        expiresAt,
      };
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  }

  getRates() {
    const quoteId = Math.floor(Math.random() * 100000).toString(); // Generate a random quoteId
    const expiresAt = Math.max(...Object.values(this.rates).map((rate) => rate.expiresAt));
    return { quoteId, rates: this.rates, expiresAt };
  }
}
