// This is where all the business logic will be stored

import { BadRequestException, Injectable } from '@nestjs/common';
import { BodyCreateRequest, Report, ReportType, data } from './database/data';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.reportType === type);
  }

  getIncomeReportById(type: ReportType, id: string) {
    return data.report
      .filter((report) => report.reportType === type)
      .find((report) => report.id === id);
  }

  createReport(type: ReportType, body: BodyCreateRequest) {
    const newReport: Report = {
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
      reportType: type,
      ...body,
    };
    data.report.push(newReport);
  }

  updateReport(id: string, body: BodyCreateRequest) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) {
      throw new BadRequestException();
    }

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };
    return data.report[reportIndex];
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
