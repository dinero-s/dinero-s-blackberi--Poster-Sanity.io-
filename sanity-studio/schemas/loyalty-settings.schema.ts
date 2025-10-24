import { defineType } from 'sanity'

export default defineType({
  name: 'loyaltySettings',
  title: 'Настройки кэшбэка',
  type: 'document',
  fields: [
    {
      name: 'apiUrl',
      title: 'API URL кэшбэка',
      type: 'url',
      description: 'URL для интеграции с системой кэшбэка'
    },
    {
      name: 'apiKey',
      title: 'API ключ',
      type: 'string',
      description: 'Ключ для авторизации в API кэшбэка'
    },
    {
      name: 'qrRegistrationUrl',
      title: 'URL регистрации QR',
      type: 'url',
      description: 'Ссылка для регистрации новых клиентов кэшбэка'
    },
    {
      name: 'active',
      title: 'Кэшбэк активен',
      type: 'boolean',
      initialValue: true,
      description: 'Включить/выключить систему кэшбэка'
    },
    {
      name: 'description',
      title: 'Описание системы кэшбэка',
      type: 'text',
      description: 'Информация о программе лояльности для клиентов'
    }
  ],
  preview: {
    select: {
      title: 'apiUrl',
      subtitle: 'active'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Настройки кэшбэка',
        subtitle: subtitle ? 'Активен' : 'Неактивен'
      }
    }
  }
})
