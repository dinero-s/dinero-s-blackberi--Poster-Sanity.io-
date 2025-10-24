import { Body, Controller, Post } from '@nestjs/common';
import { PosterService } from '../poster/poster.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Заказы')
@Controller('orders')
export class OrdersController {
  constructor(private readonly posterService: PosterService) {}

  @Post('orders')
  @ApiOperation({
    summary: 'Создать заказ в Poster (Пока не работает)',
  })
  async createIncomingOrder(@Body() body: Record<string, unknown>) {
    return this.posterService.createIncomingOrder(body);
  }
}
