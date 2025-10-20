import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { HalykSimulator } from './providers/halyk-simulator.provider';
import { BccSimulator } from './providers/bcc-simulator.provider';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, HalykSimulator, BccSimulator],
  exports: [PaymentsService],
})
export class PaymentsModule {}
