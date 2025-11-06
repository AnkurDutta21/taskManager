import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  getStatistics() {
    return this.dashboardService.getStatistics();
  }

  @Get('activities')
  @ApiOperation({ summary: 'Get recent activities feed' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getActivities(@Query('limit') limit?: number) {
    return this.dashboardService.getActivities(limit ? +limit : 20);
  }
}
