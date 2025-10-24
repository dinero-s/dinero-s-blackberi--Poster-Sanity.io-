import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PosterService } from './poster.service';
import { MenuModule } from '../menu/menu.module';
import posterConfig from '../../config/poster.config';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forFeature(posterConfig),
    forwardRef(() => MenuModule),
  ],
  providers: [
    {
      provide: 'POSTER_CONFIG',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get<{
          accountId: string;
          token: string;
          baseUrl: string;
        }>('poster')!;
      },
    },
    PosterService,
  ],
  exports: [PosterService],
})
export class PosterModule {}
