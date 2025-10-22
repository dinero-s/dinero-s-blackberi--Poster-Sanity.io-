import banner from './banner.schema'
import category from './category.schema'
import hiddenItem from './hidden-item.schema'
import limitSettings from './limit-settings.schema'
import preset from './preset.schema'
import device from './device.schema'
import menuCategoryOverride from './menu-category-override.schema'
import menuProductOverride from './menu-product-override.schema'

export const schemaTypes = [
  banner, // Стартовый баннер на главном экране планшета (логотип, CTA, изображение)
  category, // Категории меню: порядок, видимость, ID из Poster
  hiddenItem, // Список скрытых товаров (override над меню Poster)
  limitSettings, // Глобальные лимиты: буфер остатков, лимит позиций и суммы заказа
  preset, // Пресет контента: набор баннера, категорий, скрытых товаров и лимитов
  device, // Конфигурация планшета: точка продаж, язык, назначенный пресет
  menuCategoryOverride, // Скрытие категории / сортировка
  menuProductOverride, // Скрытие блюда / сортировка / описание / фото / теги
]