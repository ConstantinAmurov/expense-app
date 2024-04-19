import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReportType, BodyCreateRequest } from './database/data';
import { isReportType } from './utils';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: ReportType) {
    if (!isReportType(type)) {
      throw new BadRequestException();
    }

    return this.appService.getAllReports(type);
  }

  @Get(':id')
  getIncomeReportById(
    @Param('type') type: ReportType,
    @Param('id') id: string,
  ) {
    return this.appService.getIncomeReportById(type, id);
  }

  @Post()
  createReport(
    @Param('type') reportType: ReportType,
    @Body() body: BodyCreateRequest,
  ) {
    if (!isReportType(reportType)) {
      throw new BadRequestException();
    }

    return this.appService.createReport(reportType, body);
  }

  @Put(':id')
  updateReport(
    @Param('type') reportType: ReportType,
    @Param('id') id: string,
    @Body() body: BodyCreateRequest,
  ) {
    if (!isReportType(reportType)) {
      throw new BadRequestException();
    }

    return this.appService.updateReport(id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('type') reportType: ReportType, @Param('id') id: string) {
    if (!isReportType(reportType)) {
      throw new BadRequestException();
    }

    return this.appService.deleteReport(id);
  }
}
