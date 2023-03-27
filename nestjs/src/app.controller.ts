import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Healthcheck')
@Controller()
export class AppController {
  @Get('/healthcheck')
  @HttpCode(HttpStatus.OK)
  healthCheck() {
    return {
      healthy: true,
    };
  }
}
