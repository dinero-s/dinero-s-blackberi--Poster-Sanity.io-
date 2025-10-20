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
      name: 'categories',
      title: 'Категории',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    },
    {
      name: 'hiddenItems',
      title: 'Скрытые товары',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'hiddenItem' }] }],
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
