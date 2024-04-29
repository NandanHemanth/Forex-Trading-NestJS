import { Test, TestingModule } from '@nestjs/testing';
import { FxConversionController } from './fx-conversion.controller';
import { FxConversionService } from './fx-conversion.service';
import { FxRatesService } from './fx-rates.service';

describe('FxConversionController', () => {
  let controller: FxConversionController;
  let conversionService: FxConversionService;
  let ratesService: FxRatesService;

  beforeEach(async () => {
    const mockConversionService = {
      convert: jest.fn(),
    };
    const mockRatesService = {
      getRates: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FxConversionController],
      providers: [
        { provide: FxConversionService, useValue: mockConversionService },
        { provide: FxRatesService, useValue: mockRatesService },
      ],
    }).compile();

    controller = module.get<FxConversionController>(FxConversionController);
    conversionService = module.get<FxConversionService>(FxConversionService);
    ratesService = module.get<FxRatesService>(FxRatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should convert currency', async () => {
    const request = {
      quoteId: '12345',
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100,
    };
    const rates = {
      'USDEUR': { rate: 1.2050 },
    };
    jest.spyOn(ratesService, 'getRates').mockReturnValueOnce({
        quoteId: '12345',
        rates: { USDEUR: { rate: 1.2050, expiresAt: Date.now() + 300000 } },
        expiresAt: Date.now() + 300000,
      });
      
    const expectedConvertedAmount = 120.50;
    jest.spyOn(conversionService, 'convert').mockReturnValueOnce({ convertedAmount: expectedConvertedAmount, currency: 'EUR' });

    const result = await controller.convert(request);
    
    expect(result).toEqual({ convertedAmount: expectedConvertedAmount, currency: 'EUR' });
    expect(ratesService.getRates).toHaveBeenCalled();
    expect(conversionService.convert).toHaveBeenCalledWith(request.quoteId, request.fromCurrency, request.toCurrency, request.amount, rates);
  });

  it('should throw error if quote is invalid or expired', async () => {
    const request = {
      quoteId: '12345',
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100,
    };
    const rates = {
      'USDEUR': { rate: 1.2050 },
    };
    jest.spyOn(ratesService, 'getRates').mockReturnValueOnce({
        quoteId: '67890',
        rates: { USDEUR: { rate: 1.2050, expiresAt: Date.now() - 300000 } },
        expiresAt: Date.now() - 300000,
      });
      

    await expect(controller.convert(request)).rejects.toThrow('Invalid or expired quote');
  });
});
