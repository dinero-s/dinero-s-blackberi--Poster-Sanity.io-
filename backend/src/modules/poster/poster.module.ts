import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PosterService } from './poster.service';
import { PosterController } from './poster.controller';
import { MenuSyncModule } from '../menu-sync/menu-sync.module';

@Module({
  controllers: [PosterController],
  imports: [ConfigModule, forwardRef(() => MenuSyncModule)],
  providers: [
    {
      provide: 'POSTER_CONFIG',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        accountId: configService.get<string>('POSTER_ACCOUNT_ID') ?? '',
        token: configService.get<string>('POSTER_TOKEN') ?? '',
        baseUrl: configService.get<string>('POSTER_BASE_URL') ?? '',
      }),
    },
    PosterService,
  ],
  exports: [PosterService],
})
export class PosterModule {}
