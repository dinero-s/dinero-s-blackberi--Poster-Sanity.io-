import { Injectable, Logger } from '@nestjs/common';
import { PosterService } from '../poster/poster.service';
import { RedisService } from '../redis/redis.service';
import { SanityService } from '../sanity/sanity.service';

@Injectable()
export class MenuSyncService {
  private readonly logger = new Logger(MenuSyncService.name);

  constructor(
    private readonly posterService: PosterService,
    private readonly redisService: RedisService,
    private readonly sanityService: SanityService,
  ) {}

  async syncMenuToRedis(): Promise<void> {
    try {
      this.logger.log('Начинаем синхронизацию меню с Poster в Redis...');

      // Получаем данные из Poster
      const [menu, products, modifiers, leftovers] = await Promise.all([
        this.posterService.getMenu(),
        this.posterService.getProducts(),
        this.posterService.getModifiers(),
        this.posterService.getProductsLeftovers(),
      ]);

      // Сохраняем в Redis с TTL 1 час
      const ttl = 3600;
      await Promise.all([
        this.redisService.set('menu:categories', menu, ttl),
        this.redisService.set('menu:products', products, ttl),
        this.redisService.set('menu:modifiers', modifiers, ttl),
        this.redisService.set('menu:leftovers', leftovers, ttl),
      ]);

      this.logger.log('Синхронизация меню завершена успешно');
    } catch (error) {
      this.logger.error('Ошибка при синхронизации меню:', error);
      throw error;
    }
  }

  async getCachedMenu(): Promise<any> {
    const [categories, products, modifiers, leftovers] = await Promise.all([
      this.redisService.get('menu:categories'),
      this.redisService.get('menu:products'),
      this.redisService.get('menu:modifiers'),
      this.redisService.get('menu:leftovers'),
    ]);

    return {
      categories,
      products,
      modifiers,
      leftovers,
    };
  }

  async clearMenuCache(): Promise<void> {
    await Promise.all([
      this.redisService.del('menu:categories'),
      this.redisService.del('menu:products'),
      this.redisService.del('menu:modifiers'),
      this.redisService.del('menu:leftovers'),
    ]);
    this.logger.log('Кэш меню очищен');
  }

  async getUnifiedMenu(): Promise<any> {
    try {
      // Получаем данные из Poster
      const [posterMenu, posterProducts, posterModifiers, posterLeftovers] =
        await Promise.all([
          this.posterService.getMenu(),
          this.posterService.getProducts(),
          this.posterService.getModifiers(),
          this.posterService.getProductsLeftovers(),
        ]);

      // Получаем настройки из Sanity
      const [sanityCategories, sanityHiddenItems, sanityLimitSettings] =
        await Promise.all([
          this.sanityService.getCategories(),
          this.sanityService.getHiddenItems(),
          this.sanityService.getLimitSettings(),
        ]);

      // Объединяем данные
      const unifiedMenu = this.mergePosterWithSanity(
        posterMenu,
        posterProducts,
        posterModifiers,
        posterLeftovers,
        sanityCategories,
        sanityHiddenItems,
        sanityLimitSettings,
      );

      return unifiedMenu;
    } catch (error) {
      this.logger.error('Ошибка при получении объединенного меню:', error);
      throw error;
    }
  }

  private mergePosterWithSanity(
    posterMenu: any,
    posterProducts: any,
    posterModifiers: any,
    posterLeftovers: any,
    categoryOverrides: any[],
    productOverrides: any[],
    sanityLimitSettings: any[],
  ): any {
    // === 1. Мапа скрытых товаров (Sanity) ===
    const hiddenItemsMap = new Set(
      productOverrides
        .filter((item) => item.hidden)
        .map((item) => item.posterProductId),
    );

    // === 2. Мапа категорий (порядок/visible/title) ===
    const categoriesMap = new Map();
    categoryOverrides.forEach((cat) => {
      categoriesMap.set(cat.posterCategoryId, {
        order: cat.sortOrder ?? 999,
        visible: cat.hidden ? false : true,
        title: cat.customTitle || null,
      });
    });

    // === 3. Фильтрация + сортировка категорий ===
    const filteredCategories = (posterMenu?.response || [])
      .filter((cat: any) => {
        const sanityCat = categoriesMap.get(cat.category_id);
        return sanityCat ? sanityCat.visible : true;
      })
      .sort((a: any, b: any) => {
        const sanityA = categoriesMap.get(a.category_id);
        const sanityB = categoriesMap.get(b.category_id);
        return (sanityA?.order || 999) - (sanityB?.order || 999);
      });

    // === 4. Фильтрация товаров (удаляем скрытые — вариант A) ===
    const filteredProducts = (posterProducts?.response || []).filter(
      (product: any) => !hiddenItemsMap.has(product.product_id),
    );

    // === 5. Применяем буфер остатков ===
    const limitSettings = sanityLimitSettings[0] || { stockBufferDefault: 1 };
    const stockBuffer = limitSettings.stockBufferDefault || 1;

    const productsWithBuffer = filteredProducts.map((product: any) => {
      const leftover = (posterLeftovers?.response || []).find(
        (l: any) => l.product_id === product.product_id,
      );

      if (leftover) {
        const available = Math.max(0, leftover.count - stockBuffer);
        return {
          ...product,
          availableCount: available,
          originalCount: leftover.count,
        };
      }
      return product;
    });

    // === 6. Финальный ответ ===
    return {
      categories: filteredCategories,
      products: productsWithBuffer,
      modifiers: posterModifiers,
      leftovers: posterLeftovers,
      limitSettings: {
        globalOrderLimit: limitSettings.globalOrderLimit || 8,
        sumLimit: limitSettings.sumLimit || 20000,
        stockBufferDefault: stockBuffer,
      },
      sanityOverrides: {
        categoryOverrides,
        productOverrides,
      },
    };
  }

  async syncUnifiedMenuToRedis(): Promise<void> {
    try {
      this.logger.log('Начинаем синхронизацию объединенного меню в Redis...');

      const unifiedMenu = await this.getUnifiedMenu();

      // Сохраняем объединенное меню в Redis с TTL 1 час
      const ttl = 3600;
      await this.redisService.set('menu:unified', unifiedMenu, ttl);

      this.logger.log('Объединенное меню синхронизировано успешно');
    } catch (error) {
      this.logger.error('Ошибка при синхронизации объединенного меню:', error);
      throw error;
    }
  }

  async getCachedUnifiedMenu(): Promise<any> {
    return await this.redisService.get('menu:unified');
  }

  async handleSanityWebhook(webhookData: any): Promise<void> {
    try {
      this.logger.log(
        'Обрабатываем webhook от Sanity:',
        JSON.stringify(webhookData, null, 2),
      );

      // Нормализуем форму входящих данных (Sanity может прислать разные формы)
      // Возможные варианты расположения данных: на корне, в body, в payload, в first элементе массива
      const normalized = Array.isArray(webhookData)
        ? webhookData[0]
        : webhookData?.body || webhookData?.payload || webhookData;

      if (!normalized || typeof normalized !== 'object') {
        this.logger.warn(
          'Получен пустой или некорректный payload от Sanity, пропускаем обработку',
        );
        return;
      }

      // Определяем тип изменения
      const _type: string | undefined = normalized._type;
      const _id: string | undefined = normalized._id;

      if (!_type) {
        // Если тип не распознан – логируем и выходим без ошибки, чтобы не ломать webhook
        this.logger.warn(
          'Не удалось определить _type из payload Sanity, пропускаем обработку',
        );
        return;
      }

      if (
        ['category', 'hiddenItem', 'limitSettings', 'preset'].includes(_type)
      ) {
        // Если изменились настройки меню - пересинхронизируем объединенное меню
        await this.syncUnifiedMenuToRedis();
        this.logger.log('Объединенное меню обновлено после изменения в Sanity');
      } else if (['banner', 'device'].includes(_type)) {
        // Если изменились баннеры или устройства - обновляем только их
        const [banners, devices] = await Promise.all([
          this.sanityService.getBanners(),
          this.sanityService.getDevices(),
        ]);

        await Promise.all([
          this.redisService.set('sanity:banners', banners, 3600),
          this.redisService.set('sanity:devices', devices, 3600),
        ]);

        this.logger.log('Баннеры и устройства обновлены');
      }
    } catch (error) {
      this.logger.error('Ошибка при обработке webhook от Sanity:', error);
      throw error;
    }
  }
}
