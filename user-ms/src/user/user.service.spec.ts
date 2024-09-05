import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the correct user object by ID', () => {
    const id = '3c832ff7-b18d-4f0e-ac90-336bcd74ab63';
    const expectedUser = {
      id: id,
      username: 'bilal',
      email: 'abc@gmail.com',
      password: '123',
    };

    const result = service.findUserById(id);
    expect(result).toEqual(expectedUser);
   
  });

  it('should return New User Created', () => {
    const userInput = {
      username: 'bilal',
      email: 'abc@gmail.com',
      password: '123',
    };

    const result = service.createUser(userInput);
    result.then(function(result) {
     expect(result.email).toEqual(userInput.email);
    });
   
  });

});
