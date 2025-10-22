import type { Rule } from 'sanity';

export default {
  name: 'menuProductOverride',
  title: 'Menu Product Overrides',
  type: 'document',
  fields: [
    {
      name: 'posterProductId',
      title: 'Poster Product ID',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'hidden',
      title: 'Скрыть блюдо',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'sortOrder',
      title: 'Порядок сортировки',
      type: 'number',
      initialValue: 999
    },
    {
      name: 'customDescription',
      title: 'Описание',
      type: 'text'
    },
    {
      name: 'customPhoto',
      title: 'Фото',
      type: 'image'
    },
    {
      name: 'tag',
      title: 'Tag (HIT/NEW)',
      type: 'string',
      options: { list: ['NEW', 'HIT'] }
    }
  ]
};
