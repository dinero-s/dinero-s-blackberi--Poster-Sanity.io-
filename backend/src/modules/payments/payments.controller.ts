import { Controller, Post, Body, Param, Get, HttpCode } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ProviderCallbackDto } from './dto/callback.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('init')
  async init(@Body() dto: CreatePaymentDto) {
    const { provider, amount, currency } = dto;
    const result = this.paymentsService.createPayment(provider, amount, currency);
    return result;
  }

  @Get(':id')
  get(@Param('id') id: string) {
    const p = this.paymentsService.getPayment(id);
    if (!p) return { error: 'not_found' };
    return p;
  }

  // public webhook for Halyk
  @Post('callback/halyk')
  @HttpCode(200)
  halykCallback(@Body() body: ProviderCallbackDto) {
    const updated = this.paymentsService.handleProviderCallback(body as any);
    if (!updated) return { error: 'not_found' };
    return { ok: true, payment: updated };
  }

  // public webhook for BCC
  @Post('callback/bcc')
  @HttpCode(200)
  bccCallback(@Body() body: ProviderCallbackDto) {
    const updated = this.paymentsService.handleProviderCallback(body as any);
    if (!updated) return { error: 'not_found' };
    return { ok: true, payment: updated };
  }

  // admin/test endpoint
  @Post(':id/timeout')
  markTimeout(@Param('id') id: string) {
    const p = this.paymentsService.markTimeout(id);
    return p ? { ok: true, payment: p } : { error: 'not_found' };
  }
}
