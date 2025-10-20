import { defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Категория меню',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название категории',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Порядок сортировки',
      type: 'number',
    },
    {
      name: 'posterCategoryId',
      title: 'ID категории в Poster',
      type: 'number',
    },
    {
      name: 'visible',
      title: 'Отображать в планшете',
      type: 'boolean',
      initialValue: true,
    },
  ],
})
