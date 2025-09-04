import { Module } from '@nestjs/common';
import { DocConsumerService } from './doc-consumer.service';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [TokenModule],
  providers: [DocConsumerService],
})
export class DocConsumerModule {}
