import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SanityService } from './sanity.service';

@Module({
  imports: [ConfigModule],
  providers: [SanityService],
  exports: [SanityService],
})
export class SanityModule {}
