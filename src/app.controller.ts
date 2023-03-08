import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Healthcheck')
@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({
    description: 'Returns "String encoder Backend" if server is running'
  })
  healthcheck() {
    return 'This is aaa ';
  }
}
