import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

describe('AccountsController', () => {
  let controller: AccountsController;
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [AccountsService],
    }).compile();

    controller = module.get(AccountsController);
    service = module.get(AccountsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should call service method topUpAccount with correct parameters', () => {
    const currency = 'USD';
    const amount = 300;
    const spy = jest.spyOn(service, 'topUpAccount');

    controller.topUpAccount({ currency, amount });

    expect(spy).toHaveBeenCalledWith(currency, amount);
  });

  it('should call service method getBalances', () => {
    const balances = { USD: 1000, EUR: 500, GBP: 300 };
    jest.spyOn(service, 'getBalances').mockReturnValue(balances);

    expect(controller.getBalances()).toEqual({ balances });
  });
});
