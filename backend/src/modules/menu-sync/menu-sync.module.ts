import { Module, forwardRef } from '@nestjs/common';
import { MenuSyncService } from './menu-sync.service';
import { MenuSyncController } from './menu-sync.controller';
import { PosterModule } from '../poster/poster.module';
import { RedisModule } from '../redis/redis.module';
import { SanityModule } from '../sanity/sanity.module';

@Module({
  imports: [forwardRef(() => PosterModule), RedisModule, SanityModule],
  controllers: [MenuSyncController],
  providers: [MenuSyncService],
  exports: [MenuSyncService],
})
export class MenuSyncModule {}
