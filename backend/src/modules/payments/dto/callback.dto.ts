import { ApiProperty } from '@nestjs/swagger';

export class ProviderCallbackDto {
  @ApiProperty({
    example: 'BCC-bcf5cb39-c946-4870-8e3e-e1415f45ac1e',
    description: 'Внешний идентификатор платежа (externalRef)',
  })
  externalRef: string;

  @ApiProperty({
    example: 'SUCCESS',
    description: 'Статус платежа (например, SUCCESS, FAILED, TIMEOUT)',
  })
  status: 'SUCCESS' | 'FAILED' | 'TIMEOUT';

  @ApiProperty({
    example: 1500,
    description: 'Сумма платежа в минимальных единицах (тенге)',
  })
  amount: number;

  @ApiProperty({
    example: 'KZT',
    description: 'Код валюты (KZT, USD, EUR и т.п.)',
  })
  currency: string;

  @ApiProperty({
    example: '2025-10-21T05:45:40.807Z',
    description: 'Дата и время транзакции в ISO-формате',
  })
  timestamp: string;

  @ApiProperty({
    example: 'halyk',
    description: 'Имя платёжного провайдера (halyk | bcc)',
  })
  provider: string;

  @ApiProperty({
    example: 'ab12cd34ef56',
    description: 'Опциональная подпись для валидации колбэка',
    required: false,
  })
  signature?: string;
}

