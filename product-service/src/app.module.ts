import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { KafkaController } from './kafka/kafka.controller';
import { KafkaService } from './kafka/kafka.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './model/product.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KafkaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: (process.env.DB_PORT && parseInt(process.env.DB_PORT)) || 5433,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'postgres',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [AppController,ProductController,KafkaController],
  providers: [AppService,ProductService,KafkaService],
})
export class AppModule {}