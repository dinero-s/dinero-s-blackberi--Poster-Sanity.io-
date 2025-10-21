import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PosterService } from './poster.service';

@ApiTags('Poster API')
@Controller('poster')
export class PosterController {
  constructor(private readonly posterService: PosterService) {}

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
}
