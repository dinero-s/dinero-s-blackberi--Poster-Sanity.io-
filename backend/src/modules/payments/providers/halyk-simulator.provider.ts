// симулятор — имитирует создание QR и отправку колбека
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class HalykSimulator {
  createQr(amount: number, currency: string) {
    const externalRef = 'HALYK-' + uuid();
    const qrPayload = {
      qrUrl: `https://sandbox.halyk.kz/qr/${externalRef}`,
      externalRef,
      amount,
      currency,
      expiresIn: 120 // seconds
    };
    return qrPayload;
  }

  // эмулируем callback (в реальной интеграции банк вызывает ваш webhook)
  // здесь возвращаем payload для теста
  buildCallback(externalRef: string, status: 'SUCCESS' | 'FAILED' | 'PENDING') {
    return { externalRef, status, timestamp: new Date().toISOString() };
  }
}
