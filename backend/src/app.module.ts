import { Module } from '@nestjs/common';
import { PosterModule } from './modules/poster/poster.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [PosterModule, PaymentsModule],
})
export class AppModule {}
