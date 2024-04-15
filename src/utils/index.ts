import { ReportType } from 'src/database/data';

export function isReportType(value?: ReportType | string): boolean {
  // Check if the value matches one of the ReportType values
  return value === 'income' || value === 'expense';
}
