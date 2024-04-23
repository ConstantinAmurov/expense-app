import {
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
import { ReportType } from '../database/data';
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from '../dtos/report.dto';
import { ReportService } from './report.service';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly appService: ReportService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDto[] {
    return this.appService.getAllReports(type);
  }

  @Get(':id')
  getIncomeReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ):ReportResponseDto {
    return this.appService.getIncomeReportById(type, id);
  }

  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) reportType: ReportType,
    @Body() body: CreateReportDto,
  ): ReportResponseDto {
    return this.appService.createReport(reportType, body);
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) reportType: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ):ReportResponseDto {
    return this.appService.updateReport(id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('type', new ParseEnumPipe(ReportType)) reportType: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.appService.deleteReport(id);
  }
}
