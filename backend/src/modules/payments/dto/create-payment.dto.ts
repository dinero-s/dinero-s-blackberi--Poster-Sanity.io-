import { IsNumber, IsString, IsIn } from 'class-validator';
import type { PaymentProvider } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsIn(['HALYK_QR', 'BCC_NFC'])
  provider: PaymentProvider;
}
