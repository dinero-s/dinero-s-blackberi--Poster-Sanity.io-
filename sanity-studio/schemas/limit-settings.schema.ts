import { defineType } from 'sanity'

export default defineType({
  name: 'limitSettings',
  title: 'Настройки лимитов',
  type: 'document',
  fields: [
    {
      name: 'globalOrderLimit',
      title: 'Максимум позиций в заказе',
      type: 'number',
      initialValue: 8,
    },
    {
      name: 'sumLimit',
      title: 'Максимальная сумма заказа (₸)',
      type: 'number',
      initialValue: 20000,
    },
    {
      name: 'stockBufferDefault',
      title: 'Буфер остатков по умолчанию',
      type: 'number',
      initialValue: 1,
    },
  ],
})
