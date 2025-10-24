import banner from './banner.schema'
import limitSettings from './limit-settings.schema'
import preset from './preset.schema'
import device from './device.schema'
import categoryOverride from './category-override.schema'
import productOverride from './product-override.schema'
import loyaltySettings from './loyalty-settings.schema'
import paymentSettings from './payment-settings.schema'
import languageSettings from './language-settings.schema'

export const schemaTypes = [
  // Основные схемы
  banner, // Стартовый баннер на главном экране планшета (логотип, CTA, изображение)
  device, // Конфигурация планшета: точка продаж, язык, назначенный пресет
  preset, // Пресет контента: набор баннера, категорий, скрытых товаров и лимитов
  limitSettings, // Глобальные лимиты: буфер остатков, лимит позиций и суммы заказа
  
  // Управление контентом
  categoryOverride, // Управление категориями: скрытие, сортировка, кастомные названия
  productOverride, // Управление товарами: скрытие, сортировка, описание, фото, теги
  
  // Настройки системы 
  loyaltySettings, // Настройки кэшбэка: API URL, ключи, регистрация
  paymentSettings, // Настройки платежей: Halyk QR, BCC NFC, таймауты
  languageSettings, // Локализация: языки, переводы интерфейса
]