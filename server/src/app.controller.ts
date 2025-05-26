import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Application')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get a welcome message from the service' })
  @ApiResponse({ status: 200, description: 'Message successfully retrieved' })
  getHello(@Query('name') name?: string) {
    const user = name?.trim() || 'Guest';
    const message = this.appService.getHello();
    return {
      message,
      greetUser: `Hello, ${user}!`,
      timestamp: new Date().toISOString(),
    };
  }
}