import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';

describe('OrderService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should return the correct product object by ID', () => {
    const id = '3c832ff7-b18d-4f0e-ac90-336bcd74ab63';
    const expectedProduct = {
      id: id,
      username: 'bilal',
      email: 'abc@gmail.com',
      password: '123',
    };

    const result = service.findProductById(id);
    expect(result).toEqual(expectedProduct);
   
  });

  it('should return New product Created', () => {
    const productInput = {
      name: 'Bottle',
      description: 'Water Bottle',
      price: 10,
      quantity:10
    };
    const result = service.createProduct(productInput);
    result.then(function(result) {
     expect(result.price).toEqual(productInput.price);
    });
   
  });

});
