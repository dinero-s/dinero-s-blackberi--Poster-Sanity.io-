import { Controller, Post, Body, Param, Get, HttpCode } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ProviderCallbackDto } from './dto/callback.dto';

@ApiTags('Payments') // Группа в Swagger
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('init')
  @ApiOperation({
    summary: 'Инициализация нового платежа',
    description:
      'Создаёт платёж и возвращает данные для отображения пользователю (например, QR или ссылку).',
  })
  @ApiBody({ type: CreatePaymentDto })
  @ApiResponse({
    status: 201,
    description: 'Платёж успешно создан и ожидает подтверждения',
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные запроса' })
  init(@Body() dto: CreatePaymentDto) {
    const { provider, amount, currency } = dto;
    const result = this.paymentsService.createPayment(
      provider,
      amount,
      currency,
    );
    return result;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить данные платежа по ID',
    description:
      'Возвращает полную информацию о платеже (сумма, статус, провайдер и т.п.).',
  })
  @ApiParam({ name: 'id', example: '31a29079-34c2-4381-99c7-b146e4c28002' })
  @ApiResponse({ status: 200, description: 'Платёж найден' })
  @ApiResponse({ status: 404, description: 'Платёж не найден' })
  get(@Param('id') id: string) {
    const p = this.paymentsService.getPayment(id);
    if (!p) return { error: 'not_found' };
    return p;
  }

  @Post('callback/halyk')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Callback от Halyk Bank',
    description:
      'Публичный вебхук, вызываемый системой Halyk после завершения платежа.',
  })
  @ApiBody({ type: ProviderCallbackDto })
  @ApiResponse({
    status: 200,
    description: 'Callback успешно обработан',
  })
  @ApiResponse({
    status: 404,
    description: 'Платёж не найден по идентификатору в колбэке',
  })
  halykCallback(@Body() body: ProviderCallbackDto) {
    const updated = this.paymentsService.handleProviderCallback(body as any);
    if (!updated) return { error: 'not_found' };
    return { ok: true, payment: updated };
  }

  @Post('callback/bcc')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Callback от BCC',
    description:
      'Публичный вебхук, вызываемый системой BCC при успешной или неуспешной оплате.',
  })
  @ApiBody({ type: ProviderCallbackDto })
  @ApiResponse({
    status: 200,
    description: 'Callback успешно обработан',
  })
  @ApiResponse({
    status: 404,
    description: 'Платёж не найден по идентификатору в колбэке',
  })
  bccCallback(@Body() body: ProviderCallbackDto) {
    const updated = this.paymentsService.handleProviderCallback(body as any);
    if (!updated) return { error: 'not_found' };
    return { ok: true, payment: updated };
  }

  @Post(':id/timeout')
  @ApiOperation({
    summary: 'Принудительно отметить платёж как просроченный (timeout)',
    description:
      'Админский или тестовый эндпоинт для пометки платежа как истёкшего по времени ожидания.',
  })
  @ApiParam({ name: 'id', example: '31a29079-34c2-4381-99c7-b146e4c28002' })
  @ApiResponse({
    status: 200,
    description: 'Платёж успешно помечен как timeout',
  })
  @ApiResponse({ status: 404, description: 'Платёж не найден' })
  markTimeout(@Param('id') id: string) {
    const p = this.paymentsService.markTimeout(id);
    return p ? { ok: true, payment: p } : { error: 'not_found' };
  }
}
