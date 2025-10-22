import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SanityService {
  private readonly logger = new Logger(SanityService.name);
  private readonly sanityConfig: {
    projectId: string;
    dataset: string;
    token: string;
    baseUrl: string;
  };

  constructor(private readonly configService: ConfigService) {
    this.sanityConfig = {
      projectId: this.configService.get<string>('SANITY_PROJECT_ID') || 'hl6va2rw',
      dataset: this.configService.get<string>('SANITY_DATASET') || 'production',
      token: this.configService.get<string>('SANITY_TOKEN') || '',
      baseUrl: this.configService.get<string>('SANITY_BASE_URL') || 'https://hl6va2rw.api.sanity.io',
    };
  }

  private makeQuery(query: string): string {
    return `${this.sanityConfig.baseUrl}/v2023-05-03/data/query/${this.sanityConfig.dataset}?query=${encodeURIComponent(query)}`;
  }

  async getBanners(): Promise<any[]> {
    const query = `*[_type == "banner" && active == true] | order(_createdAt desc)`;
    const url = this.makeQuery(query);
    
    try {
      const { data } = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${this.sanityConfig.token}`,
        },
      });
      return data.result || [];
    } catch (error) {
      this.logger.error('Ошибка при получении баннеров из Sanity:', error);
      return [];
    }
  }

  async getCategories(): Promise<any[]> {
    const query = `*[_type == "category"] | order(order asc)`;
    const url = this.makeQuery(query);
    
    try {
      const { data } = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${this.sanityConfig.token}`,
        },
      });
      return data.result || [];
    } catch (error) {
      this.logger.error('Ошибка при получении категорий из Sanity:', error);
      return [];
    }
  }

  async getHiddenItems(): Promise<any[]> {
    const query = `*[_type == "hiddenItem" && active == true]`;
    const url = this.makeQuery(query);
    
    try {
      const { data } = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${this.sanityConfig.token}`,
        },
      });
      return data.result || [];
    } catch (error) {
      this.logger.error('Ошибка при получении скрытых товаров из Sanity:', error);
      return [];
    }
  }

  async getLimitSettings(): Promise<any[]> {
    const query = `*[_type == "limitSettings"] | order(_createdAt desc)`;
    const url = this.makeQuery(query);
    
    try {
      const { data } = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${this.sanityConfig.token}`,
        },
      });
      return data.result || [];
    } catch (error) {
      this.logger.error('Ошибка при получении настроек лимитов из Sanity:', error);
      return [];
    }
  }

  async getPresets(): Promise<any[]> {
    const query = `*[_type == "preset" && active == true]`;
    const url = this.makeQuery(query);
    
    try {
      const { data } = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${this.sanityConfig.token}`,
        },
      });
      return data.result || [];
    } catch (error) {
      this.logger.error('Ошибка при получении пресетов из Sanity:', error);
      return [];
    }
  }

  async getDevices(): Promise<any[]> {
    const query = `*[_type == "device" && active == true]`;
    const url = this.makeQuery(query);
    
    try {
      const { data } = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${this.sanityConfig.token}`,
        },
      });
      return data.result || [];
    } catch (error) {
      this.logger.error('Ошибка при получении устройств из Sanity:', error);
      return [];
    }
  }
}
