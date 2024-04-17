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
import { ReportType, data, Report, BodyCreateRequest } from './database/data';
import { randomUUID } from 'crypto';
import { isReportType } from './utils';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: ReportType) {
    if (!isReportType(type)) {
      throw new BadRequestException();
    }

    return data.report.filter((report) => report.reportType === type);
  }

  @Get(':id')
  getIncomeReportById(
    @Param('type') type: ReportType,
    @Param('id') id: string,
  ) {
    return data.report
      .filter((report) => report.reportType === type)
      .find((report) => report.id === id);
  }

  @Post()
  createReport(
    @Param('type') reportType: ReportType,
    @Body() body: BodyCreateRequest,
  ) {
    if (!isReportType(reportType)) {
      throw new BadRequestException();
    }

    const newReport: Report = {
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
      reportType,
      ...body,
    };
    data.report.push(newReport);
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

    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) {
      throw new BadRequestException();
    }

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date()
    };
    return data.report[reportIndex];
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('type') reportType: ReportType,
    @Param('id') id: string) {
    if (!isReportType(reportType)) {
      throw new BadRequestException();
    }

    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) {
      throw new BadRequestException();
    }

    data.report.splice(reportIndex,1);
    return;
  }
}
