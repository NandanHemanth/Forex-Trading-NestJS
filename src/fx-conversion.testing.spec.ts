import { Test, TestingModule } from '@nestjs/testing';
import { FxConversionController } from './fx-conversion.controller';
import { FxConversionService } from './fx-conversion.service';
import { FxRatesService } from './fx-rates.service';

describe('FxConversionController', () => {
  let controller: FxConversionController;
  let conversionService: FxConversionService;
  let ratesService: FxRatesService;

  // Set up the controller, conversion service, and rates service instances before each test
  beforeEach(async () => {
    // Mock conversion service and rates service to simulate behavior
    const mockConversionService = {
      convert: jest.fn(),
    };
    const mockRatesService = {
      getRates: jest.fn(),
    };

    // Create a testing module and inject mocked services
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FxConversionController],
      providers: [
        { provide: FxConversionService, useValue: mockConversionService },
        { provide: FxRatesService, useValue: mockRatesService },
      ],
    }).compile();

    // Retrieve instances of the controller and services for testing
    controller = module.get<FxConversionController>(FxConversionController);
    conversionService = module.get<FxConversionService>(FxConversionService);
    ratesService = module.get<FxRatesService>(FxRatesService);
  });

  // Test to ensure that the controller instance is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test to verify that currency conversion is performed correctly
  it('should convert currency', async () => {
    // Define request parameters and expected rates
    const request = {
      quoteId: '12345',
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100,
    };
    const rates = {
      'USDEUR': { rate: 1.2050 },
    };

    // Mock rates service to return predefined rates
    jest.spyOn(ratesService, 'getRates').mockReturnValueOnce({
      quoteId: '12345',
      rates: { USDEUR: { rate: 1.2050, expiresAt: Date.now() + 300000 } },
      expiresAt: Date.now() + 300000,
    });

    // Define expected converted amount
    const expectedConvertedAmount = 120.50;
    // Mock conversion service to return predefined converted amount
    jest.spyOn(conversionService, 'convert').mockReturnValueOnce({ convertedAmount: expectedConvertedAmount, currency: 'EUR' });

    // Call the controller method and await the result
    const result = await controller.convert(request);

    // Check if the result matches the expected converted amount and currency
    expect(result).toEqual({ convertedAmount: expectedConvertedAmount, currency: 'EUR' });
    // Verify that the rates service method was called
    expect(ratesService.getRates).toHaveBeenCalled();
    // Verify that the conversion service method was called with the correct parameters
    expect(conversionService.convert).toHaveBeenCalledWith(request.quoteId, request.fromCurrency, request.toCurrency, request.amount, rates);
  });

  // Test to verify that an error is thrown if the quote is invalid or expired
  it('should throw error if quote is invalid or expired', async () => {
    // Define request parameters and expected rates
    const request = {
      quoteId: '12345',
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100,
    };
    const rates = {
      'USDEUR': { rate: 1.2050 },
    };

    // Mock rates service to return predefined rates with an expired quote
    jest.spyOn(ratesService, 'getRates').mockReturnValueOnce({
      quoteId: '67890',
      rates: { USDEUR: { rate: 1.2050, expiresAt: Date.now() - 300000 } },
      expiresAt: Date.now() - 300000,
    });

    // Check if calling the controller method with invalid or expired quote throws an error
    await expect(controller.convert(request)).rejects.toThrow('Invalid or expired quote');
  });
});
