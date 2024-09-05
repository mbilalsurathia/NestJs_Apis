import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../model/user.model';
import { UserDto } from '../dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private users: User[] = [];

  // Simulated database (you should replace this with a real database)
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createUser(userData: UserDto): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(userId: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      return user;
    } catch (error) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }


  async deleteUserById(userId: string): Promise<void | undefined> {
    try {
      await this.userRepository.delete({ id: userId });
    } catch (error) {
      throw new NotFoundException(`Product with ID ${userId} not found`);
    }
  }

  async updateUserById(userId: string, userData: UserDto): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      user.password = userData.password
      user.username = userData.username
      user.email = userData.email

      return await this.userRepository.save(user)

    } catch (error) {
      throw new NotFoundException(`Product with ID ${userId} not found`);
    }
  }

}
