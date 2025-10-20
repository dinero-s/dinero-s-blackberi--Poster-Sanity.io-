import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PosterService {
  private readonly baseUrl = 'https://api.joinposter.com/api/';
  private readonly token = 'YOUR_POSTER_TOKEN'; // вынести в .env

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
}
