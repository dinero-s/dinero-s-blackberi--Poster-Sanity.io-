import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BccSimulator {
  initPayment(amount: number, currency: string) {
    const externalRef = 'BCC-' + uuid();
    // For NFC, provider may not give QR — return token/terminal id
    return {
      terminalToken: `term_${externalRef}`,
      externalRef,
      amount,
      currency,
    };
  }

  buildCallback(externalRef: string, status: 'SUCCESS' | 'FAILED' | 'PENDING') {
    return { externalRef, status, timestamp: new Date().toISOString() };
  }
}
