import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should return the correct Order object by ID', () => {
    const id = '3c832ff7-b18d-4f0e-ac90-336bcd74ab63';
    const expectedOrder = {
      id: id,
      username: 'bilal',
      email: 'abc@gmail.com',
      password: '123',
    };

    const result = service.findOrderById(id);
    expect(result).toEqual(expectedOrder);

  });

  it('should return New Order Created', () => {
    const orderInput = {
      productId: 'ff7904d1-ff88-4492-901a-18d9d4349f97',
      quantity: 10,
      userId: 'f78a7785-e428-4a51-9379-b554175215e8'
    };
    const result = service.createOrder(orderInput);
    result.then(function (result) {
      expect(result).toEqual('Your Order has been placed with Order Id: ' + orderInput.productId);
    });

  });

});
