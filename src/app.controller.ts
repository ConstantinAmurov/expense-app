import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ReportType, BodyCreateRequest } from './database/data';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type',new ParseEnumPipe(ReportType)) type: ReportType) {
    return this.appService.getAllReports(type);
  }

  @Get(':id')
  getIncomeReportById(
    @Param('type',new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id',ParseUUIDPipe) id: string,
  ) {
    return this.appService.getIncomeReportById(type, id);
  }

  @Post()
  createReport(
    @Param('type',new ParseEnumPipe(ReportType)) reportType: ReportType,
    @Body() body: BodyCreateRequest,
  ) {
    return this.appService.createReport(reportType, body);
  }

  @Put(':id')
  updateReport(
    @Param('type',new ParseEnumPipe(ReportType)) reportType: ReportType,
    @Param('id',ParseUUIDPipe) id: string,
    @Body() body: BodyCreateRequest,
  ) {
    return this.appService.updateReport(id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('type',new ParseEnumPipe(ReportType)) reportType: ReportType, @Param('id',ParseUUIDPipe ) id: string) {
    return this.appService.deleteReport(id);
  }
}
