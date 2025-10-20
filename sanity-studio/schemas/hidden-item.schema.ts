import { defineType } from 'sanity'

export default defineType({
  name: 'hiddenItem',
  title: 'Скрытый товар',
  type: 'document',
  fields: [
    {
      name: 'posterItemId',
      title: 'ID товара в Poster',
      type: 'number',
    },
    {
      name: 'reason',
      title: 'Причина скрытия',
      type: 'string',
    },
    {
      name: 'active',
      title: 'Активен (скрыт сейчас)',
      type: 'boolean',
      initialValue: true,
    },
  ],
})
