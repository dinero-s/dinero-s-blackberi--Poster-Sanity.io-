import { defineType } from 'sanity'

export default defineType({
  name: 'preset',
  title: 'Пресет контента',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название пресета',
      type: 'string',
    },
    {
      name: 'banner',
      title: 'Баннер',
      type: 'reference',
      to: [{ type: 'banner' }],
    },
    {
      name: 'categoryOverrides',
      title: 'Настройки категорий',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'categoryOverride' }] }],
    },
    {
      name: 'productOverrides',
      title: 'Настройки товаров',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'productOverride' }] }],
    },
    {
      name: 'limitSettings',
      title: 'Настройки лимитов',
      type: 'reference',
      to: [{ type: 'limitSettings' }],
    },
    {
      name: 'active',
      title: 'Активен',
      type: 'boolean',
      initialValue: true,
    },
  ],
})
