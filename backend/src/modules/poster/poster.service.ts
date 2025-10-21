import { Inject, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import {
  PosterCreateOrderResponseDto,
  PosterLeftoversResponseDto,
  PosterProductsResponseDto,
  PosterReceiptsResponseDto,
} from './dto/poster-products.dto';

@Injectable()
export class PosterService {
  private readonly logger = new Logger(PosterService.name);

  constructor(
    @Inject('POSTER_CONFIG')
    private readonly posterConfig: {
      accountId: string;
      token: string;
      baseUrl: string;
    },
  ) {}

  // === Общий URL для методов публичного API Poster ===
  private makeUrl(endpoint: string): string {
    return `https://joinposter.com/api/${endpoint}?format=json&token=${this.posterConfig.token}`;
  }

  // === 1. Получить список категорий меню ===
  async getMenu(): Promise<unknown> {
    const url = this.makeUrl('menu.getCategories');
    try {
      const { data } = await axios.get<unknown>(url);
      return data;
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : String(e);
      this.logger.error(`Ошибка при запросе меню Poster: ${err}`);
      throw e;
    }
  }

  // === 2. Получить список всех товаров ===
  async getProducts(): Promise<PosterProductsResponseDto> {
    const url = this.makeUrl('menu.getProducts');
    this.logger.debug(`makeUrl('menu.getProducts): ${url}`);
    try {
      const { data } = await axios.get<PosterProductsResponseDto>(url);
      return data;
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : String(e);
      this.logger.error(`Ошибка при запросе товаров Poster: ${err}`);
      throw e;
    }
  }

  // === 3. Получить модификаторы (например, сироп, молоко и т.д.) ===
  async getModifiers(): Promise<
    Array<{ id: number; name: string; price: number }>
  > {
    const url = this.makeUrl('menu.getProducts');
    const { data } = await axios.get<PosterProductsResponseDto>(url);

    if (!data?.response) {
      this.logger.error(
        `Poster API вернул некорректный ответ: ${JSON.stringify(data)}`,
      );
      throw new Error(
        (data?.error as { message?: string })?.message ||
          'Poster API returned no response',
      );
    }

    return data.response
      .flatMap((p) => p.modifications ?? [])
      .map((m) => ({
        id: Number(m.modificator_id),
        name: m.modificator_name,
        price: Number(m.modificator_price),
      }));
  }

  // === 4. Получить остатки товаров по складу ===
  async getProductsLeftovers(): Promise<PosterLeftoversResponseDto> {
    const url = this.makeUrl('storage.getStorageLeftovers');
    try {
      const { data } = await axios.get<PosterLeftoversResponseDto>(url);
      return data;
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : String(e);
      this.logger.error(`Ошибка при запросе остатков Poster: ${err}`);
      throw e;
    }
  }

  // === 5. Получить список ингредиентов ===
  async getIngredients(): Promise<unknown> {
    const url = this.makeUrl('menu.getIngredients');
    try {
      const { data } = await axios.get<unknown>(url);
      return data;
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : String(e);
      this.logger.error(`Ошибка при запросе ингредиентов Poster: ${err}`);
      throw e;
    }
  }

  // === 6. Получить список категорий ингредиентов ===
  async getCategoriesIngredients(): Promise<unknown> {
    const url = this.makeUrl('menu.getCategoriesIngredients');
    try {
      const { data } = await axios.get<unknown>(url);
      return data;
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : String(e);
      this.logger.error(
        `Ошибка при запросе категорий ингредиентов Poster: ${err}`,
      );
      throw e;
    }
  }

  // === 7. Получить список цехов ===
  async getWorkshops(): Promise<unknown> {
    const url = this.makeUrl('menu.getWorkshops');
    try {
      const { data } = await axios.get<unknown>(url);
      return data;
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : String(e);
      this.logger.error(`Ошибка при запросе цехов Poster: ${err}`);
      throw e;
    }
  }

  // === Получить чеки / транзакции из Poster ===
  async getReceipts(): Promise<PosterReceiptsResponseDto> {
    const url = this.makeUrl('transactions.getTransactions');
    this.logger.debug(`makeUrl(transactions.getTransactions): ${url}`);

    try {
      const { data } = await axios.get<PosterReceiptsResponseDto>(url);

      if (!data?.response) {
        this.logger.error(
          `Poster API вернул некорректный ответ: ${JSON.stringify(data)}`,
        );
        throw new Error(
          (data?.error as { message?: string })?.message ||
            'Poster API returned no response',
        );
      }

      return data;
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : String(e);
      this.logger.error(`Ошибка при получении чеков Poster: ${err}`);
      throw e;
    }
  }

  async createIncomingOrder(
    payload: Record<string, unknown>,
  ): Promise<PosterCreateOrderResponseDto> {
    const url = `https://${this.posterConfig.accountId}.joinposter.com/api/incomingOrders.createIncomingOrder?format=json&token=${this.posterConfig.token}`;
    this.logger.debug(`makeUrl(incomingOrders.createIncomingOrder): ${url}`);

    try {
      const { data } = await axios.post<PosterCreateOrderResponseDto>(
        url,
        payload,
      );

      if (!data?.response) {
        this.logger.error(
          `Poster API вернул некорректный ответ: ${JSON.stringify(data)}`,
        );
        throw new Error(
          (data?.error as { message?: string })?.message ||
            'Poster API returned no response',
        );
      }

      return data;
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : String(e);
      this.logger.error(`Ошибка при создании заказа Poster: ${err}`);
      throw e;
    }
  }
}
