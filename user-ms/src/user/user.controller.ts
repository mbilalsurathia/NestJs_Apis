import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../model/user.model';
import { UserDto } from '../dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  @Post()
  async createUser(@Body() userData: UserDto) {
    return await this.userService.createUser(userData);
  }

  @Post(':id')
  async updateUser(@Param('id') id: string,@Body() userData: UserDto) {
    return await this.userService.updateUserById(id,userData);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<string> {
    await this.userService.deleteUserById(id);
    return "User has been deleted: " + id
  }
}
