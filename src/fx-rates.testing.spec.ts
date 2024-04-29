import { Test, TestingModule } from '@nestjs/testing';
import { FxRatesController } from './fx-rates.controller';
import { FxRatesService } from './fx-rates.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, of } from 'rxjs';

describe('FxRatesController', () => {
  let controller: FxRatesController;
  let service: FxRatesService;

  beforeEach(async () => {
    const mockHttpService = {
      get: jest.fn(() => of({ data: { 'Time Series FX (Daily)': { '2024-04-28': { '4. close': '1.2050' } } } }))
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FxRatesController],
      providers: [
        FxRatesService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    controller = module.get(FxRatesController);
    service = module.get(FxRatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return rates from service', async () => {
    const rates = { EUR: { rate: 1.2050, expiresAt: expect.any(Number) } };
    jest.spyOn(service, 'getRates').mockReturnValueOnce({ quoteId: '12345', rates, expiresAt: expect.any(Number) });

    const result = await controller.getRates();
    expect(result).toEqual({ quoteId: '12345', rates, expiresAt: expect.any(Number) });
  });
});
