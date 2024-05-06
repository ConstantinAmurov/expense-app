import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ReportService } from './report/report.service';
import { ReportController } from './report/report.controller';
import { SummaryController } from './summary/summary.controller';
import { SummaryService } from './summary/summary.service';
import { SummaryModule } from './summary/summary.module';

@Module({
  imports: [SummaryModule],
  controllers: [AppController,ReportController, SummaryController],
  providers: [
    ReportService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    SummaryService,
  ],
})
export class AppModule {}
