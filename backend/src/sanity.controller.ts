import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import axios from 'axios';

@ApiTags('Админка')
@Controller('admin')
export class SanityController {
  private readonly projectId = 'hl6va2rw';
  private readonly dataset = 'production';
  private readonly apiVersion = 'v2025-01-01';

  @Get('fetch')
  @ApiOperation({ summary: 'Get data from Sanity.io by GROQ query' })
  @ApiQuery({ name: 'query', required: false, example: '*[_type == "banner"]' })
  async fetchData(@Query('query') query: string = '*[_type == "banner"]') {
    const url = `https://${this.projectId}.api.sanity.io/${this.apiVersion}/data/query/${this.dataset}?query=${encodeURIComponent(
      query,
    )}`;

    const response = await axios.get(url);
    return response.data;
  }
}
