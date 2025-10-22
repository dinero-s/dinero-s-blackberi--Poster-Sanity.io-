import { Module } from '@nestjs/common';
import { PosterModule } from './modules/poster/poster.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { MenuSyncModule } from './modules/menu-sync/menu-sync.module';
import { RedisModule } from './modules/redis/redis.module';
import { SanityModule } from './modules/sanity/sanity.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RedisModule,
    SanityModule,
    PosterModule,
    PaymentsModule,
    MenuSyncModule,
  ],
})
export class AppModule {}
