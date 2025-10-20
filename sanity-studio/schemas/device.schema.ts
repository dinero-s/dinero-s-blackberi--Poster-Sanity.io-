import { defineType } from 'sanity'

export default defineType({
  name: 'device',
  title: 'Планшет / устройство',
  type: 'document',
  fields: [
    {
      name: 'deviceId',
      title: 'ID устройства (deviceId)',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Название точки',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Адрес / описание точки',
      type: 'string',
    },
    {
      name: 'languageDefault',
      title: 'Язык по умолчанию',
      type: 'string',
      options: {
        list: [
          { title: 'Русский', value: 'ru' },
          { title: 'Казахский', value: 'kz' },
          { title: 'Английский', value: 'en' },
        ],
      },
      initialValue: 'ru',
    },
    {
      name: 'preset',
      title: 'Пресет меню',
      type: 'reference',
      to: [{ type: 'preset' }],
    },
    {
      name: 'active',
      title: 'Активен',
      type: 'boolean',
      initialValue: true,
    },
  ],
})
