import { Module } from '@nestjs/common';
import { PosterModule } from './modules/poster/poster.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PosterModule,
    PaymentsModule,
  ],
})
export class AppModule {}
