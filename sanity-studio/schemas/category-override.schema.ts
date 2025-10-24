import { defineType } from 'sanity'

export default defineType({
  name: 'categoryOverride',
  title: 'Управление категориями',
  type: 'document',
  fields: [
    {
      name: 'posterCategoryId',
      title: 'ID категории в Poster',
      type: 'string',
      description: 'Уникальный идентификатор категории в системе Poster'
    },
    {
      name: 'customTitle',
      title: 'Кастомное название',
      type: 'string',
      description: 'Переопределить название категории для планшета'
    },
    {
      name: 'hidden',
      title: 'Скрыть категорию',
      type: 'boolean',
      initialValue: false,
      description: 'Скрыть эту категорию на планшете'
    },
    {
      name: 'sortOrder',
      title: 'Порядок сортировки',
      type: 'number',
      initialValue: 999,
      description: 'Порядок отображения категории (меньше число = выше в списке)'
    },
    {
      name: 'customDescription',
      title: 'Кастомное описание',
      type: 'text',
      description: 'Дополнительное описание категории для планшета'
    },
    {
      name: 'customIcon',
      title: 'Кастомная иконка',
      type: 'image',
      description: 'Иконка категории для планшета'
    },
    {
      name: 'active',
      title: 'Активен',
      type: 'boolean',
      initialValue: true,
      description: 'Включить/выключить настройки для этой категории'
    }
  ],
  preview: {
    select: {
      title: 'customTitle',
      posterId: 'posterCategoryId',
      hidden: 'hidden',
      order: 'sortOrder'
    },
    prepare(selection) {
      const { title, posterId, hidden, order } = selection
      return {
        title: title || `Категория ${posterId}`,
        subtitle: `${hidden ? 'Скрыта' : 'Видима'} • Порядок: ${order}`
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
      by: [{ field: 'posterCategoryId', direction: 'asc' }]
    }
  ]
})
