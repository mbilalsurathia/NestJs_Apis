import { Injectable } from '@nestjs/common';
import { Kafka, Producer, logLevel } from 'kafkajs';

@Injectable()
export class KafkaProducerService {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      brokers: ['kafka:9092']
    });

    this.producer = kafka.producer();
  }

  async sendMessage(topic: string, message: string) {  
    await this.producer.connect();
    await this.producer.send({
      topic: topic,
      messages: [{ value: message }],
    });
    await this.producer.disconnect();
  }
}