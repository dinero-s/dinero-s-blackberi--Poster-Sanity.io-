import { defineType } from 'sanity'

export default defineType({
  name: 'languageSettings',
  title: 'Настройки языков',
  type: 'document',
  fields: [
    {
      name: 'defaultLanguage',
      title: 'Язык по умолчанию',
      type: 'string',
      options: {
        list: [
          { title: 'Русский', value: 'ru' },
          { title: 'Казахский', value: 'kz' },
          { title: 'Английский', value: 'en' }
        ]
      },
      initialValue: 'ru',
      description: 'Язык интерфейса по умолчанию для новых планшетов'
    },
    {
      name: 'availableLanguages',
      title: 'Доступные языки',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Русский', value: 'ru' },
              { title: 'Казахский', value: 'kz' },
              { title: 'Английский', value: 'en' }
            ]
          }
        }
      ],
      initialValue: ['ru', 'kz', 'en'],
      description: 'Список языков, доступных для переключения'
    },
    {
      name: 'translations',
      title: 'Переводы',
      type: 'object',
      fields: [
        {
          name: 'ru',
          title: 'Русский',
          type: 'object',
          fields: [
            { name: 'startButton', title: 'Кнопка "Начать"', type: 'string', initialValue: 'Начать' },
            { name: 'cashbackButton', title: 'Кнопка "У меня есть кэшбэк"', type: 'string', initialValue: 'У меня есть кэшбэк' },
            { name: 'getCashbackButton', title: 'Кнопка "Получить кэшбэк"', type: 'string', initialValue: 'Получить кэшбэк' },
            { name: 'cartButton', title: 'Кнопка "Корзина"', type: 'string', initialValue: 'Корзина' },
            { name: 'payButton', title: 'Кнопка "Оплатить"', type: 'string', initialValue: 'Оплатить' },
            { name: 'orderNumber', title: 'Номер заказа', type: 'string', initialValue: 'Номер заказа' },
            { name: 'waitingMessage', title: 'Сообщение ожидания', type: 'string', initialValue: 'Ожидаем приготовление...' }
          ]
        },
        {
          name: 'kz',
          title: 'Казахский',
          type: 'object',
          fields: [
            { name: 'startButton', title: 'Кнопка "Начать"', type: 'string', initialValue: 'Бастау' },
            { name: 'cashbackButton', title: 'Кнопка "У меня есть кэшбэк"', type: 'string', initialValue: 'Менің кэшбэгім бар' },
            { name: 'getCashbackButton', title: 'Кнопка "Получить кэшбэк"', type: 'string', initialValue: 'Кэшбэк алу' },
            { name: 'cartButton', title: 'Кнопка "Корзина"', type: 'string', initialValue: 'Себет' },
            { name: 'payButton', title: 'Кнопка "Оплатить"', type: 'string', initialValue: 'Төлеу' },
            { name: 'orderNumber', title: 'Номер заказа', type: 'string', initialValue: 'Тапсырыс нөмірі' },
            { name: 'waitingMessage', title: 'Сообщение ожидания', type: 'string', initialValue: 'Дайындалуын күтеміз...' }
          ]
        },
        {
          name: 'en',
          title: 'Английский',
          type: 'object',
          fields: [
            { name: 'startButton', title: 'Кнопка "Начать"', type: 'string', initialValue: 'Start' },
            { name: 'cashbackButton', title: 'Кнопка "У меня есть кэшбэк"', type: 'string', initialValue: 'I have cashback' },
            { name: 'getCashbackButton', title: 'Кнопка "Получить кэшбэк"', type: 'string', initialValue: 'Get cashback' },
            { name: 'cartButton', title: 'Кнопка "Корзина"', type: 'string', initialValue: 'Cart' },
            { name: 'payButton', title: 'Кнопка "Оплатить"', type: 'string', initialValue: 'Pay' },
            { name: 'orderNumber', title: 'Номер заказа', type: 'string', initialValue: 'Order number' },
            { name: 'waitingMessage', title: 'Сообщение ожидания', type: 'string', initialValue: 'Waiting for preparation...' }
          ]
        }
      ],
      description: 'Переводы интерфейса на разные языки'
    }
  ],
  preview: {
    select: {
      default: 'defaultLanguage',
      available: 'availableLanguages'
    },
    prepare(selection) {
      const { default: defaultLang, available } = selection
      const langNames = { ru: 'Русский', kz: 'Казахский', en: 'Английский' }
      
      return {
        title: 'Настройки языков',
        subtitle: `По умолчанию: ${langNames[defaultLang as keyof typeof langNames] || defaultLang}, Доступно: ${available?.length || 0} языков`
      }
    }
  }
})
