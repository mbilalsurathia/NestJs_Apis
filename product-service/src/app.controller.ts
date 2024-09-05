import { Controller ,Get,OnModuleInit} from '@nestjs/common';
import { AppService } from './app.service';
import { KafkaService } from './kafka/kafka.service';
import { ProductService } from './product/product.service';
@Controller()
export class AppController implements OnModuleInit{
  constructor(private readonly appService: AppService,private readonly kafkaConsumerService: KafkaService,private readonly productService: ProductService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  async onModuleInit() {
    const topic = 'order-events'; // Replace with your Kafka topic
   // await this.kafkaConsumerService.consumeMessages(topic);
      await this.productService.comsumeMessages(topic);
  }
}
