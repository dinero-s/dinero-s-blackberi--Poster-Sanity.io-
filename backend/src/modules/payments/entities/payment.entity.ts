export type PaymentProvider = 'HALYK_QR' | 'BCC_NFC';
export type PaymentStatus = 'INIT' | 'PENDING' | 'SUCCESS' | 'FAILED' | 'TIMEOUT';

export class PaymentEntity {
  id: string;
  provider: PaymentProvider;
  amount: number; // cents / minor units or decimal string in prod
  currency: string;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  externalRef?: string; // from provider
  callbackPayload?: any;
}
