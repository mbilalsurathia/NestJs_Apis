 import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
 import { Kafka, Producer, Consumer, logLevel } from 'kafkajs';


@Injectable()
export class KafkaService  {
  private kafka;
  constructor() {
     this.kafka = new Kafka({
      brokers: ['kafka:9092']
    });

  }

  async consumeMessages(topic: string): Promise<void> {
    const consumer = this.kafka.consumer({ groupId: 'my-group' });

    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(`Received message: ${message.value.toString()}`);
        const parsedObject = JSON.parse(message.value.toString());
        console.log(parsedObject.order.productId);
      },
    });
  }
  returnKafka() : any {
      return this.kafka
  }
}