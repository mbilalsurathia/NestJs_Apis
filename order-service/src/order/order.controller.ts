import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
  Delete
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '../model/order.model';
import { OrderDto } from '../dto/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return await this.orderService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Order> {
    const order = await this.orderService.findOrderById(id);

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  @Post()
  async createOrder(@Body() orderData: OrderDto) {
    return await this.orderService.createOrder(orderData);
  }


  @Post(':id')
  async updateOrder(@Param('id') id: string,@Body() orderData: OrderDto) {
    return await this.orderService.updateOrder(id,orderData);
  }

  @Delete(':id')
  async deleteOrderById(@Param('id') id: string): Promise<string> {
    await this.orderService.deleteOrderById(id);
    return "Order has been deleted: " + id
  }
}
