import { Injectable, Logger } from '@nestjs/common';
import {
  PaymentEntity,
  PaymentStatus,
  PaymentProvider,
} from './entities/payment.entity';
import { v4 as uuid } from 'uuid';
import { HalykSimulator } from './providers/halyk-simulator.provider';
import { BccSimulator } from './providers/bcc-simulator.provider';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  // in-memory store for tests; swap for Redis/Postgres in prod
  private payments = new Map<string, PaymentEntity>();

  constructor(
    private readonly halyk: HalykSimulator,
    private readonly bcc: BccSimulator,
  ) {}

  createPayment(provider: PaymentProvider, amount: number, currency = 'KZT') {
    const id = uuid();
    const now = new Date();
    const p: PaymentEntity = {
      id,
      provider,
      amount,
      currency,
      status: 'INIT',
      createdAt: now,
      updatedAt: now,
    };
    this.payments.set(id, p);

    // provider init
    let providerPayload: any;
    if (provider === 'HALYK_QR') {
      providerPayload = this.halyk.createQr(amount, currency);
    } else {
      providerPayload = this.bcc.initPayment(amount, currency);
    }

    // move to PENDING (simulating that QR/terminal shown)
    p.status = 'PENDING';
    p.externalRef = providerPayload.externalRef;
    p.updatedAt = new Date();
    this.payments.set(id, p);

    // return payment + provider payload (QR url / terminal token)
    return { payment: p, providerPayload };
  }

  getPayment(id: string) {
    return this.payments.get(id);
  }

  handleProviderCallback(payload: {
    externalRef: string;
    status: 'SUCCESS' | 'FAILED' | 'PENDING';
    details?: any;
  }) {
    // find payment by externalRef
    const found = Array.from(this.payments.values()).find(
      (p) => p.externalRef === payload.externalRef,
    );
    if (!found) return null;
    const prev = found.status;
    if (payload.status === 'SUCCESS') found.status = 'SUCCESS';
    else if (payload.status === 'FAILED') found.status = 'FAILED';
    else if (payload.status === 'PENDING') found.status = 'PENDING';
    found.callbackPayload = payload;
    found.updatedAt = new Date();
    this.payments.set(found.id, found);

    this.logger.log(
      `Payment ${found.id} ${prev} -> ${found.status} (externalRef=${payload.externalRef})`,
    );
    return found;
  }

  // helper to simulate timeout for test
  markTimeout(id: string) {
    const p = this.payments.get(id);
    if (!p) return null;
    p.status = 'TIMEOUT';
    p.updatedAt = new Date();
    this.payments.set(id, p);
    return p;
  }
}
