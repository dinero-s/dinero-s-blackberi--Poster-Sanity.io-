import { Module } from '@nestjs/common';
import { PosterModule } from './modules/poster/poster.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { MenuModule } from './modules/menu/menu.module';
import { RedisModule } from './common/redis/redis.module';
import { SanityModule } from './modules/sanity/sanity.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './modules/order/orders.module';
import { ReceiptsModule } from './modules/receipt/receipts.module';

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
    MenuModule,
    OrdersModule,
    ReceiptsModule,
  ],
})
export class AppModule {}
