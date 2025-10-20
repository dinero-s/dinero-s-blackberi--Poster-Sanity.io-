import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PosterService } from './poster.service';

@ApiTags('Poster API')
@Controller('poster')
export class PosterController {
  constructor(private readonly posterService: PosterService) {}

  @Get('menu')
  async getMenu() {
    return this.posterService.getMenu();
  }

  @Get('products')
  async getProducts() {
    return this.posterService.getProducts();
  }

  @Get('modifiers')
  async getModifiers() {
    return this.posterService.getModifiers();
  }
}
