

import { Body, Controller, Post, Get } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Controller('kafka-consumer')
export class KafkaController {
    constructor(private readonly kafkaService: KafkaService) { }

    @Post('publish')
    async publishMessage(@Body() body: { topic: string; message: string }): Promise<void> {
        const { topic, message } = body;
        // await this.kafkaService.send(topic, message);
    }

    @Get('consume')
    async startConsuming(): Promise<string> {
        // Start Kafka consumption from the consumer service
        await this.kafkaService.consumeMessages('order-events');
        return 'Kafka consumption started!';
    }
}