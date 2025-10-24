import { Controller, Post, Get, HttpCode, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MenuService } from './menu.service';

@ApiTags('Меню')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('sync')
  @ApiOperation({
    summary: 'Синхронизировать меню из Poster в Redis',
    description: 'Получает актуальные данные из Poster и сохраняет в Redis кэш',
  })
  @ApiResponse({ status: 200, description: 'Синхронизация завершена успешно' })
  async syncMenu() {
    await this.menuService.syncMenuToRedis();
    return { message: 'Меню синхронизировано успешно' };
  }

  @Get('cached')
  @ApiOperation({
    summary: 'Получить кэшированное меню из Redis',
    description: 'Возвращает меню из Redis кэша вместо прямого запроса к Poster',
  })
  @ApiResponse({ status: 200, description: 'Кэшированное меню получено' })
  async getCachedMenu() {
    return await this.menuService.getCachedMenu();
  }

  @Post('webhook/sanity')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Webhook для обновления меню из админки Sanity',
    description: 'Получает уведомления от Sanity Studio и обновляет кэш меню',
  })
  @ApiResponse({ status: 200, description: 'Webhook обработан успешно' })
  async sanityWebhook(@Body() body: any) {
    await this.menuService.handleSanityWebhook(body);
    return { message: 'Webhook обработан успешно' };
  }

  @Post('clear-cache')
  @ApiOperation({
    summary: 'Очистить кэш меню',
    description: 'Удаляет все данные меню из Redis кэша',
  })
  @ApiResponse({ status: 200, description: 'Кэш очищен успешно' })
  async clearCache() {
    await this.menuService.clearMenuCache();
    return { message: 'Кэш меню очищен' };
  }

  @Post('sync-unified')
  @ApiOperation({
    summary: 'Синхронизировать объединенное меню (Poster + Sanity)',
    description: 'Получает данные из Poster, применяет настройки из Sanity и сохраняет в Redis',
  })
  @ApiResponse({ status: 200, description: 'Объединенное меню синхронизировано успешно' })
  async syncUnifiedMenu() {
    await this.menuService.syncUnifiedMenuToRedis();
    return { message: 'Объединенное меню синхронизировано успешно' };
  }

  @Get('unified')
  @ApiOperation({
    summary: 'Получить объединенное меню (Poster + Sanity)',
    description: 'Возвращает меню с примененными настройками из Sanity (сортировка, скрытие, лимиты)',
  })
  @ApiResponse({ status: 200, description: 'Объединенное меню получено' })
  async getUnifiedMenu() {
    return await this.menuService.getCachedUnifiedMenu();
  }

  @Get('unified/fresh')
  @ApiOperation({
    summary: 'Получить свежее объединенное меню',
    description: 'Получает актуальные данные из Poster и Sanity, объединяет их и возвращает',
  })
  @ApiResponse({ status: 200, description: 'Свежее объединенное меню получено' })
  async getFreshUnifiedMenu() {
    return await this.menuService.getUnifiedMenu();
  }
}
