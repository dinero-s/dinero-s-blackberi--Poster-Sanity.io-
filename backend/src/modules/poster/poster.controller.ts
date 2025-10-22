import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PosterService } from './poster.service';
import { MenuSyncService } from '../menu-sync/menu-sync.service';

@ApiTags('Poster API')
@Controller('poster')
export class PosterController {
  constructor(
    private readonly posterService: PosterService,
    private readonly menuSyncService: MenuSyncService,
  ) {}

  @Get('menu')
  @ApiOperation({ summary: 'Получить список категорий меню из Poster' })
  async getMenu() {
    return this.posterService.getMenu();
  }

  @Get('products')
  @ApiOperation({ summary: 'Получить список всех товаров из Poster' })
  async getProducts() {
    return this.posterService.getProducts();
  }

  @Get('modifiers')
  @ApiOperation({
    summary: 'Получить модификаторы товаров (например, сироп, молоко и т.д.)',
  })
  async getModifiers() {
    return this.posterService.getModifiers();
  }

  @Get('leftovers')
  @ApiOperation({ summary: 'Получить остатки товаров на складе из Poster' })
  async getProductsLeftovers() {
    return this.posterService.getProductsLeftovers();
  }

  @Get('ingredients')
  @ApiOperation({ summary: 'Получить ингредиенты из Poster' })
  async getIngredients() {
    return this.posterService.getIngredients();
  }

  @Get('ingredients/categories')
  @ApiOperation({ summary: 'Получить категории ингредиентов из Poster' })
  async getCategoriesIngredients() {
    return this.posterService.getCategoriesIngredients();
  }

  @Get('workshops')
  @ApiOperation({ summary: 'Получить список цехов из Poster' })
  async getWorkshops() {
    return this.posterService.getWorkshops();
  }

  @Post('orders')
  @ApiOperation({
    summary: 'Создать заказ в Poster (Пока не работает)',
  })
  async createIncomingOrder(@Body() body: Record<string, unknown>) {
    return this.posterService.createIncomingOrder(body);
  }

  @Get('receipts')
  @ApiOperation({
    summary: 'Получить список чеков из Poster (Пока не работает)',
  })
  async getReceipts() {
    return this.posterService.getReceipts();
  }

  // === Кэшированные endpoints ===
  @Get('cached/menu')
  @ApiOperation({ summary: 'Получить кэшированное меню из Redis' })
  async getCachedMenu() {
    return this.menuSyncService.getCachedMenu();
  }

  @Get('cached/products')
  @ApiOperation({ summary: 'Получить кэшированные товары из Redis' })
  async getCachedProducts() {
    const menu = await this.menuSyncService.getCachedMenu();
    return menu.products;
  }

  @Get('cached/modifiers')
  @ApiOperation({ summary: 'Получить кэшированные модификаторы из Redis' })
  async getCachedModifiers() {
    const menu = await this.menuSyncService.getCachedMenu();
    return menu.modifiers;
  }

  @Get('cached/leftovers')
  @ApiOperation({ summary: 'Получить кэшированные остатки из Redis' })
  async getCachedLeftovers() {
    const menu = await this.menuSyncService.getCachedMenu();
    return menu.leftovers;
  }
}
