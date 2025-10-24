import { defineType } from 'sanity'

export default defineType({
  name: 'productOverride',
  title: 'Управление товарами',
  type: 'document',
  fields: [
    {
      name: 'posterProductId',
      title: 'ID товара в Poster',
      type: 'string',
      description: 'Уникальный идентификатор товара в системе Poster'
    },
    {
      name: 'hidden',
      title: 'Скрыть товар',
      type: 'boolean',
      initialValue: false,
      description: 'Скрыть этот товар на планшете'
    },
    {
      name: 'sortOrder',
      title: 'Порядок сортировки',
      type: 'number',
      initialValue: 999,
      description: 'Порядок отображения товара в категории (меньше число = выше в списке)'
    },
    {
      name: 'customName',
      title: 'Кастомное название',
      type: 'string',
      description: 'Переопределить название товара для планшета'
    },
    {
      name: 'customDescription',
      title: 'Кастомное описание',
      type: 'text',
      description: 'Переопределить описание товара для планшета'
    },
    {
      name: 'customPhoto',
      title: 'Кастомное фото',
      type: 'image',
      options: { hotspot: true },
      description: 'Переопределить фото товара для планшета'
    },
    {
      name: 'tag',
      title: 'Тег товара',
      type: 'string',
      options: {
        list: [
          { title: 'Новинка', value: 'NEW' },
          { title: 'Хит', value: 'HIT' },
          { title: 'Специальное предложение', value: 'SPECIAL' },
          { title: 'Скоро', value: 'SOON' }
        ]
      },
      description: 'Специальный тег для выделения товара'
    },
    {
      name: 'customPrice',
      title: 'Кастомная цена',
      type: 'number',
      description: 'Переопределить цену товара (оставьте пустым для использования цены из Poster)'
    },
    {
      name: 'allergens',
      title: 'Аллергены',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Глютен', value: 'gluten' },
              { title: 'Молочные продукты', value: 'dairy' },
              { title: 'Орехи', value: 'nuts' },
              { title: 'Яйца', value: 'eggs' },
              { title: 'Соя', value: 'soy' },
              { title: 'Рыба', value: 'fish' },
              { title: 'Морепродукты', value: 'seafood' }
            ]
          }
        }
      ],
      description: 'Список аллергенов в товаре'
    },
    {
      name: 'nutritionInfo',
      title: 'Пищевая ценность',
      type: 'object',
      fields: [
        { name: 'calories', title: 'Калории', type: 'number' },
        { name: 'protein', title: 'Белки (г)', type: 'number' },
        { name: 'carbs', title: 'Углеводы (г)', type: 'number' },
        { name: 'fat', title: 'Жиры (г)', type: 'number' }
      ],
      description: 'Пищевая ценность товара'
    },
    {
      name: 'active',
      title: 'Активен',
      type: 'boolean',
      initialValue: true,
      description: 'Включить/выключить настройки для этого товара'
    }
  ],
  preview: {
    select: {
      title: 'customName',
      posterId: 'posterProductId',
      hidden: 'hidden',
      tag: 'tag',
      order: 'sortOrder'
    },
    prepare(selection) {
      const { title, posterId, hidden, tag, order } = selection
      const tagEmoji = { NEW: '🆕', HIT: '🔥', SPECIAL: '⭐', SOON: '⏰' }
      
      return {
        title: title || `Товар ${posterId}`,
        subtitle: `${hidden ? 'Скрыт' : 'Видим'} • ${tag ? tagEmoji[tag as keyof typeof tagEmoji] + ' ' + tag : ''} • Порядок: ${order}`
      }
    }
  },
  orderings: [
    {
      title: 'По порядку сортировки',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }]
    },
    {
      title: 'По ID Poster',
      name: 'posterIdAsc',
      by: [{ field: 'posterProductId', direction: 'asc' }]
    },
    {
      title: 'По тегу',
      name: 'tagAsc',
      by: [{ field: 'tag', direction: 'asc' }]
    }
  ]
})
