interface Data {
  report: Report[];
}

export interface Report {
  id: string;
  source: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
  reportType: ReportType;
}

export type ReportType = 'income' | 'expense';

export type BodyCreateRequest = Pick<Report, 'amount' | 'source'>;

const dummyReport: Report = {
  id: '1',
  source: 'Salary',
  amount: 7500,
  created_at: new Date(),
  updated_at: new Date(),
  reportType: 'income',
};
const dummyReport2: Report = {
  id: '2',
  source: 'Donation',
  amount: 1500,
  created_at: new Date(),
  updated_at: new Date(),
  reportType: 'income',
};

const dummyReport3: Report = {
  id: '3',
  source: 'Food',
  amount: 500,
  created_at: new Date(),
  updated_at: new Date(),
  reportType: 'expense',
};
export const data: Data = {
  report: [dummyReport, dummyReport2, dummyReport3],
};
