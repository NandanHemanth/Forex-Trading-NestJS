// importing required modules
import { Test, TestingModule } from '@nestjs/testing';
import { FxRatesController } from './fx-rates.controller';
import { FxRatesService } from './fx-rates.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, of } from 'rxjs';

describe('FxRatesController', () => {
  let controller: FxRatesController;
  let service: FxRatesService;

  // Set up the controller and service instances before each test
  beforeEach(async () => {
    // Mock HttpService to simulate API responses
    const mockHttpService = {
      get: jest.fn(() => of({ data: { 'Time Series FX (Daily)': { '2024-04-28': { '4. close': '1.2050' } } } }))
    };

    // Create a testing module and inject mocked HttpService
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

    // Retrieve instances of the controller and service for testing
    controller = module.get(FxRatesController);
    service = module.get(FxRatesService);
  });

  // Test to ensure that both the controller and service instances are defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  // Test to verify that the controller returns rates from the service
  it('should return rates from service', async () => {
    // Define expected rates with a specific structure
    const rates = { EUR: { rate: 1.2050, expiresAt: expect.any(Number) } };
    // Mock the service method to return predefined rates
    jest.spyOn(service, 'getRates').mockReturnValueOnce({ quoteId: '12345', rates, expiresAt: expect.any(Number) });

    // Call the controller method and await the result
    const result = await controller.getRates();

    // Check if the result matches the expected structure and values
    expect(result).toEqual({ quoteId: '12345', rates, expiresAt: expect.any(Number) });
  });
});
