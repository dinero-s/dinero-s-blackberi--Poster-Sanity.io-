import axios from 'axios';
import { POSTER_CONFIG } from '../config/poster.config';

export class PosterAPI {
  private baseUrl = POSTER_CONFIG.baseUrl;
  private token = POSTER_CONFIG.token;

  async getMenu() {
    const url = `${this.baseUrl}menu.getCategories?token=${this.token}`;
    const { data } = await axios.get(url);
    return data;
  }

  async getProducts() {
    const url = `${this.baseUrl}menu.getProducts?token=${this.token}`;
    const { data } = await axios.get(url);
    return data;
  }

  async createOrder(order: any) {
    const url = `${this.baseUrl}incomingOrders.createIncomingOrder?token=${this.token}`;
    const { data } = await axios.post(url, order);
    return data;
  }
}
