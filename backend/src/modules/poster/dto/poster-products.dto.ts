import { ApiProperty } from '@nestjs/swagger';

export class PosterModifierDto {
  @ApiProperty({ example: '1', description: 'ID модификатора' })
  modificator_id: string;

  @ApiProperty({
    example: 'Молоко кокосовое',
    description: 'Название модификатора',
  })
  modificator_name: string;

  @ApiProperty({ example: '200', description: 'Цена модификатора (строкой)' })
  modificator_price: string;
}

export class PosterProductDto {
  @ApiProperty({ example: '123', description: 'ID товара' })
  product_id: string;

  @ApiProperty({ example: 'Латте', description: 'Название товара' })
  product_name: string;

  @ApiProperty({
    type: [PosterModifierDto],
    required: false,
    description: 'Список модификаторов для товара (если есть)',
  })
  modifications?: PosterModifierDto[];
}

export class PosterProductsResponseDto {
  @ApiProperty({ type: [PosterProductDto], description: 'Список товаров' })
  response: PosterProductDto[];
  error: any;
}

export class PosterLeftoverDto {
  @ApiProperty({ example: '123', description: 'ID товара' })
  product_id: string;

  @ApiProperty({ example: '45', description: 'ID модификации (если есть)' })
  modification_id: string;

  @ApiProperty({ example: '10', description: 'Остаток на складе' })
  balance: string;
}

export class PosterLeftoversResponseDto {
  @ApiProperty({ type: [PosterLeftoverDto] })
  response: PosterLeftoverDto[];
}

export class PosterCreateOrderResponseDto {
  @ApiProperty({
    example: { incoming_order_id: '55423' },
    description: 'Ответ при создании заказа',
  })
  response: {
    incoming_order_id: string;
  };
  error: { message?: string | undefined };
}

export class PosterPayOrderResponseDto {
  @ApiProperty({
    example: { result: 1, message: 'Оплата успешно проведена' },
    description: 'Результат оплаты заказа',
  })
  response: {
    result: number;
    message: string;
  };
}

export class PosterReceiptDto {
  @ApiProperty({ example: '789', description: 'ID чека' })
  receipt_id: string;

  @ApiProperty({ example: '1500', description: 'Сумма чека' })
  receipt_sum: string;

  @ApiProperty({
    example: '2025-10-21 10:15:00',
    description: 'Дата закрытия чека',
  })
  date_close: string;
}

export class PosterReceiptsResponseDto {
  @ApiProperty({ type: [PosterReceiptDto], description: 'Список чеков' })
  response: PosterReceiptDto[];
  error: { message?: string | undefined };
}
