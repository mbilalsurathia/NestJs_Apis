import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../model/product.model';
import { ProductDto } from '../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KafkaService } from '../kafka/kafka.service'

@Injectable()
export class ProductService {
  private products: Product[] = [];

  // Simulated database (you should replace this with a real database)
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly kafkaService: KafkaService,
  ) { }

  async createProduct(productData: ProductDto): Promise<Product> {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findProductById(productId: string): Promise<Product | undefined> {
    try {
      const product = await this.productRepository.findOneBy({ id: productId });
      return product;
    } catch (error) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  }
  async updateProductByIdAfterOrder(productId: string, quantity: string): Promise<Product | undefined> {
    try {
      const product = await this.productRepository.findOneBy({ id: productId });
      console.log(product)
      if (product.quantity > Number(quantity)) {
        product.quantity = product.quantity - Number(quantity)
        return await this.productRepository.save(product)
      } else {
        console.log("not possible")
      }
    } catch (error) {
      console.log("productId not found")
    }
  }

  async comsumeMessages(topic: string) {
    const kafka = this.kafkaService.returnKafka()
    const consumer = kafka.consumer({ groupId: 'my-group' });

    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(`Received message: ${message.value.toString()}`);
        const parsedObject = JSON.parse(message.value.toString());
        await this.updateProductByIdAfterOrder(parsedObject.order.productId, parsedObject.order.quantity)
        // Process the message here
      },
    });
  }

  async deleteProductById(productId: string): Promise<void | undefined> {
    try {
      await this.productRepository.delete({ id: productId });
    } catch (error) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  }

  async updateProductById(productId: string, productData: ProductDto): Promise<Product | undefined> {
    try {
      const product = await this.productRepository.findOneBy({ id: productId });
      product.quantity = productData.quantity
      product.price = productData.price
      product.description = productData.description
      product.name = productData.name
      return await this.productRepository.save(product)

    } catch (error) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  }

}
