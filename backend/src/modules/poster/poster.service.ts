import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { POSTER_CONFIG } from '../../config/poster.config';

@Injectable()
export class PosterService {
  private readonly baseUrl = POSTER_CONFIG.baseUrl;
  private readonly token = encodeURIComponent(POSTER_CONFIG.token); // кодируем токен для URL

  // Получить список категорий меню
  async getMenu() {
    const url = `${this.baseUrl}menu.getCategories?token=${this.token}`;
    const { data } = await axios.get(url);
    return data;
  }

  // Получить список всех товаров
  async getProducts() {
    const url = `${this.baseUrl}menu.getProducts?token=${this.token}`;
    const { data } = await axios.get(url);
    return data;
  }

  // Получить модификаторы (например, сироп, молоко и т.д.)
  async getModifiers() {
    const url = `${this.baseUrl}menu.getProducts?token=${this.token}`;
    const { data } = await axios.get(url);

    // собираем все модификаторы из товаров
    const modifiers = data.response
      .flatMap((p: any) => p.modifications || [])
      .map((m: any) => ({
        id: Number(m.modificator_id),
        name: m.modificator_name,
        price: Number(m.modificator_price),
      }));

    return modifiers;
  }
}
