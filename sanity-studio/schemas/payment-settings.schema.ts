import { defineType } from 'sanity'

export default defineType({
  name: 'paymentSettings',
  title: 'Настройки платежей',
  type: 'document',
  fields: [
    {
      name: 'halykQrActive',
      title: 'Halyk QR активен',
      type: 'boolean',
      initialValue: true,
      description: 'Включить оплату через Halyk QR'
    },
    {
      name: 'halykQrSettings',
      title: 'Настройки Halyk QR',
      type: 'object',
      fields: [
        {
          name: 'apiUrl',
          title: 'API URL Halyk',
          type: 'url'
        },
        {
          name: 'merchantId',
          title: 'ID мерчанта',
          type: 'string'
        },
        {
          name: 'apiKey',
          title: 'API ключ',
          type: 'string'
        }
      ],
      options: {
        collapsible: true,
        collapsed: true
      }
    },
    {
      name: 'bccNfcActive',
      title: 'BCC NFC активен',
      type: 'boolean',
      initialValue: true,
      description: 'Включить оплату через BCC NFC'
    },
    {
      name: 'bccNfcSettings',
      title: 'Настройки BCC NFC',
      type: 'object',
      fields: [
        {
          name: 'apiUrl',
          title: 'API URL BCC',
          type: 'url'
        },
        {
          name: 'terminalId',
          title: 'ID терминала',
          type: 'string'
        },
        {
          name: 'apiKey',
          title: 'API ключ',
          type: 'string'
        }
      ],
      options: {
        collapsible: true,
        collapsed: true
      }
    },
    {
      name: 'paymentTimeout',
      title: 'Таймаут оплаты (секунды)',
      type: 'number',
      initialValue: 120,
      description: 'Время ожидания оплаты в секундах'
    },
    {
      name: 'retryAttempts',
      title: 'Количество попыток',
      type: 'number',
      initialValue: 3,
      description: 'Количество попыток при неудачной оплате'
    }
  ],
  preview: {
    select: {
      halyk: 'halykQrActive',
      bcc: 'bccNfcActive'
    },
    prepare(selection) {
      const { halyk, bcc } = selection
      const methods = []
      if (halyk) methods.push('Halyk QR')
      if (bcc) methods.push('BCC NFC')
      
      return {
        title: 'Настройки платежей',
        subtitle: methods.length > 0 ? methods.join(', ') : 'Нет активных методов'
      }
    }
  }
})
