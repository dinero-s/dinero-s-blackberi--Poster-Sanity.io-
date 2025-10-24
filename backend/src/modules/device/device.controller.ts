import { Controller } from '@nestjs/common';
import { DeviceService } from './device.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Девайс')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}
}