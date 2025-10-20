import { defineType } from 'sanity'

export default defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Картинка',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'ctaText',
      title: 'Текст кнопки (CTA)',
      type: 'string',
    },
    {
      name: 'ctaLink',
      title: 'Ссылка',
      type: 'url',
    },
    {
      name: 'active',
      title: 'Активен',
      type: 'boolean',
      initialValue: true,
    },
  ],
})
