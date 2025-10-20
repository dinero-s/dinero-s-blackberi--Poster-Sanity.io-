import { Module } from '@nestjs/common';
import { SanityController } from './sanity.controller';

@Module({
  controllers: [SanityController],
})
export class AppModule {}
