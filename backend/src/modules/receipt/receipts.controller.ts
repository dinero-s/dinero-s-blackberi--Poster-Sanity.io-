import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PosterService } from '../poster/poster.service';

@ApiTags('Чеки')
@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly posterService: PosterService) {}

  @Get('receipts')
  @ApiOperation({
    summary: 'Получить список чеков из Poster (Пока не работает)',
  })
  async getReceipts() {
    return this.posterService.getReceipts();
  }
}