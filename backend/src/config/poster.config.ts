import { registerAs } from '@nestjs/config';

export default registerAs('poster', () => ({
  accountId: process.env.POSTER_ACCOUNT_ID || '',
  token: process.env.POSTER_TOKEN || '',
  baseUrl: process.env.POSTER_BASE_URL || '',
}));
