import { Module, forwardRef } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PosterModule } from '../poster/poster.module';
import { RedisModule } from '../../common/redis/redis.module';
import { SanityModule } from '../sanity/sanity.module';

@Module({
  imports: [forwardRef(() => PosterModule), RedisModule, SanityModule],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
