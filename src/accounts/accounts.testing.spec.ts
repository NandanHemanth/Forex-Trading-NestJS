// importing required modules
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

describe('AccountsController', () => {
  let controller: AccountsController;
  let service: AccountsService;

  beforeEach(async () => {
    // Create a testing module to instantiate the controller and service
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [AccountsService],
    }).compile();

    // Retrieve instances of the controller and service for testing
    controller = module.get(AccountsController);
    service = module.get(AccountsService);
  });

  // Test to ensure that both the controller and service instances are defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  // Test to verify that the topUpAccount method of the controller calls the service method with correct parameters
  it('should call service method topUpAccount with correct parameters', () => {
    const currency = 'USD';
    const amount = 300;
    const spy = jest.spyOn(service, 'topUpAccount'); // Spy on the service method

    controller.topUpAccount({ currency, amount }); // Call the controller method

    expect(spy).toHaveBeenCalledWith(currency, amount); // Check if service method is called with correct parameters
  });

  // Test to check that the getBalances method of the controller returns expected balances
  it('should call service method getBalances', () => {
    const balances = { USD: 1000, EUR: 500, GBP: 300 };
    jest.spyOn(service, 'getBalances').mockReturnValue(balances); // Mock the service method to return predefined balances

    expect(controller.getBalances()).toEqual({ balances }); // Check if controller method returns expected balances
  });
});
