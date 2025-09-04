import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DocConsumerModule } from './components/doc-consumer/doc-consumer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        exchanges: [
          { name: 'my_exchange', type: 'topic' },
        ],
        uri: `amqp://${configService.get('RABBITMQ_USER')}:${configService.get('RABBITMQ_PASS')}@${configService.get('RABBITMQ_HOST')}:${configService.get('RABBITMQ_PORT')}`,
        connectionInitOptions: { wait: true },
      }),
      inject: [ConfigService],
    }),
    DocConsumerModule,
  ],
})
export class AppModule {}
