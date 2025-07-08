export interface Member {
  id: number;
  fullName: string;
  idNumber: string;
  phoneNumber: string;
  address: string;
  photoId?: string;
  groupId: number;
  guarantorName: string;
  guarantorIdNumber: string;
  guarantorPhone: string;
  guarantorAddress: string;
  registrationDate: string;
}

export interface Group {
  id: number;
  name: string;
  registrationDate: string;
  memberIds: number[];
}

export interface LoanAccount {
  id: number;
  memberId: number;
  groupId: number;
  amount: number;
  interestRate: number;
  duration: number; // in months
  startDate: string;
  status: 'active' | 'completed' | 'defaulted';
  weeklyPaymentAmount: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
}

export interface Disbursement {
  id: number;
  loanAccountId: number;
  amount: number;
  disbursementDate: string;
  memberId: number;
  groupId: number;
}

export interface Transaction {
  id: number;
  loanAccountId: number;
  memberId: number;
  groupId: number;
  amount: number;
  paymentDate: string;
  type: 'payment' | 'penalty';
  penaltyPercentage?: number;
  notes?: string;
}

export interface DailyReport {
  date: string;
  totalCollections: number;
  totalPenalties: number;
  totalDisbursements: number;
  transactionCount: number;
}