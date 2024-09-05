import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../model/order.model';
import { OrderDto } from '../dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KafkaProducerService } from '../kafka/kafka.service';
@Injectable()
export class OrderService {
  private orders: Order[] = [];

  // Simulated database (you should replace this with a real database)
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly kafkaService: KafkaProducerService,
  ) { }

  async createOrder(orderData: OrderDto): Promise<string> {
    const order = this.orderRepository.create(orderData);
    const createdOrder = await this.orderRepository.save(order);
    // Send a Kafka event when an order is created
    const orderEvent = {
      eventType: 'OrderCreated',
      order: createdOrder,
    };

    await this.kafkaService.sendMessage('order-events', JSON.stringify(orderEvent));

    //return createdOrder;
    return 'Your Order has been placed with Order Id: ' + createdOrder.id;
  }

  async getAllOrders(): Promise<Order[]> {
    // await this.kafkaService.consume('order-events');
    return await this.orderRepository.find();
  }

  async findOrderById(orderId: string): Promise<Order | undefined> {
    try {
      const order = await this.orderRepository.findOneBy({ id: orderId });
      return order;
    } catch (error) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
  }

  async deleteOrderById(orderId: string): Promise<void | undefined> {
    try {
      await this.orderRepository.delete({ id: orderId });
    } catch (error) {
      throw new NotFoundException(`Product with ID ${orderId} not found`);
    }
  }

  async updateOrder(orderId: string, orderData: OrderDto): Promise<Order | undefined> {
    try {
      const order = await this.orderRepository.findOneBy({ id: orderId });
      order.productId = orderData.productId
      order.quantity = orderData.quantity
      order.userId = orderData.userId

      return await this.orderRepository.save(order)

    } catch (error) {
      throw new NotFoundException(`Product with ID ${orderId} not found`);
    }
  }

}
