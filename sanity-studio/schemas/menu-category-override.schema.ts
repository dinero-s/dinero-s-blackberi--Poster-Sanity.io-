import type { Rule } from 'sanity';

export default {
  name: 'menuCategoryOverride',
  title: 'Menu Category Overrides',
  type: 'document',
  fields: [
    {
      name: 'posterCategoryId',
      title: 'Poster Category ID',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'hidden',
      title: 'Скрыть категорию',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'sortOrder',
      title: 'Порядок сортировки',
      type: 'number',
      initialValue: 999
    }
  ]
};
