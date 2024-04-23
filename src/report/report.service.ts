// This is where all the business logic will be stored

import { BadRequestException,  Injectable } from '@nestjs/common';
import { Report, ReportType, data } from '../database/data';
import { randomUUID } from 'crypto';
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from '../dtos/report.dto';

@Injectable()
export class ReportService {
  getAllReports(type: ReportType) :ReportResponseDto[] {
    const allReports =data.report.filter((report) => report.reportType === type);

    return allReports.map((report) => new ReportResponseDto(report)); 
  }

  getIncomeReportById(type: ReportType, id: string): ReportResponseDto {

    const report = data.report
    .filter((report) => report.reportType === type)
    .find((report) => report.id === id);

    if(!report) return;

    return new ReportResponseDto(report);
    
  }

  createReport(type: ReportType, body: CreateReportDto): ReportResponseDto {
    const newReport: Report = {
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
      reportType: type,
      ...body,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(id: string, body: UpdateReportDto): ReportResponseDto {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) {
      throw new BadRequestException();
    }

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };
    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) {
      throw new BadRequestException();
    }

    data.report.splice(reportIndex, 1);
    return;
  }
}
