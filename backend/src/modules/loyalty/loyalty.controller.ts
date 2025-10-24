import { Controller } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Кэшбэк')
@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}
}