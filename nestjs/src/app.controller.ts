import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @HttpCode(HttpStatus.OK)
  @Get('/healthcheck')
  healthCheck() {
    return {
      healthy: true,
    };
  }
}
