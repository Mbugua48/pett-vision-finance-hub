import { Member, Group, LoanAccount, Disbursement, Transaction } from '@/types';

export const mockGroups: Group[] = [
  {
    id: 1,
    name: 'Unity Group',
    registrationDate: '2024-01-15',
    memberIds: [1, 2, 3]
  },
  {
    id: 2,
    name: 'Progress Group',
    registrationDate: '2024-02-20',
    memberIds: [4, 5]
  },
  {
    id: 3,
    name: 'Hope Group',
    registrationDate: '2024-03-10',
    memberIds: [6, 7, 8]
  }
];

export const mockMembers: Member[] = [
  {
    id: 1,
    fullName: 'Jane Doe',
    idNumber: 'ID001234567',
    phoneNumber: '+254701234567',
    address: '123 Main St, Nairobi',
    groupId: 1,
    guarantorName: 'John Smith',
    guarantorIdNumber: 'ID009876543',
    guarantorPhone: '+254709876543',
    guarantorAddress: '456 Oak Ave, Nairobi',
    registrationDate: '2024-01-20'
  },
  {
    id: 2,
    fullName: 'Mary Johnson',
    idNumber: 'ID002345678',
    phoneNumber: '+254702345678',
    address: '789 Pine Rd, Nairobi',
    groupId: 1,
    guarantorName: 'Peter Brown',
    guarantorIdNumber: 'ID008765432',
    guarantorPhone: '+254708765432',
    guarantorAddress: '321 Elm St, Nairobi',
    registrationDate: '2024-01-22'
  },
  {
    id: 3,
    fullName: 'David Wilson',
    idNumber: 'ID003456789',
    phoneNumber: '+254703456789',
    address: '147 Cedar Ln, Nairobi',
    groupId: 1,
    guarantorName: 'Susan Davis',
    guarantorIdNumber: 'ID007654321',
    guarantorPhone: '+254707654321',
    guarantorAddress: '852 Birch Dr, Nairobi',
    registrationDate: '2024-01-25'
  },
  {
    id: 4,
    fullName: 'Sarah Miller',
    idNumber: 'ID004567890',
    phoneNumber: '+254704567890',
    address: '963 Maple Ave, Nairobi',
    groupId: 2,
    guarantorName: 'Robert Taylor',
    guarantorIdNumber: 'ID006543210',
    guarantorPhone: '+254706543210',
    guarantorAddress: '741 Walnut St, Nairobi',
    registrationDate: '2024-02-25'
  },
  {
    id: 5,
    fullName: 'Michael Brown',
    idNumber: 'ID005678901',
    phoneNumber: '+254705678901',
    address: '258 Spruce Rd, Nairobi',
    groupId: 2,
    guarantorName: 'Lisa Wilson',
    guarantorIdNumber: 'ID005432109',
    guarantorPhone: '+254705432109',
    guarantorAddress: '369 Ash Ln, Nairobi',
    registrationDate: '2024-02-28'
  },
  {
    id: 6,
    fullName: 'Grace Ochieng',
    idNumber: 'ID006789012',
    phoneNumber: '+254706789012',
    address: '456 Acacia St, Nairobi',
    groupId: 3,
    guarantorName: 'James Kimani',
    guarantorIdNumber: 'ID004321098',
    guarantorPhone: '+254704321098',
    guarantorAddress: '789 Baobab Ave, Nairobi',
    registrationDate: '2024-03-15'
  },
  {
    id: 7,
    fullName: 'Peter Mwangi',
    idNumber: 'ID007890123',
    phoneNumber: '+254707890123',
    address: '321 Thorn Rd, Nairobi',
    groupId: 3,
    guarantorName: 'Nancy Njeri',
    guarantorIdNumber: 'ID003210987',
    guarantorPhone: '+254703210987',
    guarantorAddress: '654 Palm Dr, Nairobi',
    registrationDate: '2024-03-18'
  },
  {
    id: 8,
    fullName: 'Lucy Wanjiku',
    idNumber: 'ID008901234',
    phoneNumber: '+254708901234',
    address: '987 Bamboo Ln, Nairobi',
    groupId: 3,
    guarantorName: 'Samuel Karanja',
    guarantorIdNumber: 'ID002109876',
    guarantorPhone: '+254702109876',
    guarantorAddress: '147 Mango St, Nairobi',
    registrationDate: '2024-03-20'
  }
];

export const mockLoanAccounts: LoanAccount[] = [
  {
    id: 1,
    memberId: 1,
    groupId: 1,
    amount: 50000,
    interestRate: 25,
    duration: 3,
    startDate: '2024-01-25',
    status: 'active',
    weeklyPaymentAmount: 5208,
    totalAmount: 62500,
    paidAmount: 20832,
    remainingAmount: 41668
  },
  {
    id: 2,
    memberId: 2,
    groupId: 1,
    amount: 30000,
    interestRate: 18,
    duration: 2,
    startDate: '2024-02-01',
    status: 'active',
    weeklyPaymentAmount: 4425,
    totalAmount: 35400,
    paidAmount: 13275,
    remainingAmount: 22125
  },
  {
    id: 3,
    memberId: 4,
    groupId: 2,
    amount: 75000,
    interestRate: 25,
    duration: 3,
    startDate: '2024-03-01',
    status: 'active',
    weeklyPaymentAmount: 7812,
    totalAmount: 93750,
    paidAmount: 15624,
    remainingAmount: 78126
  }
];

export const mockDisbursements: Disbursement[] = [
  {
    id: 1,
    loanAccountId: 1,
    amount: 50000,
    disbursementDate: '2024-01-25',
    memberId: 1,
    groupId: 1
  },
  {
    id: 2,
    loanAccountId: 2,
    amount: 30000,
    disbursementDate: '2024-02-01',
    memberId: 2,
    groupId: 1
  },
  {
    id: 3,
    loanAccountId: 3,
    amount: 75000,
    disbursementDate: '2024-03-01',
    memberId: 4,
    groupId: 2
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    loanAccountId: 1,
    memberId: 1,
    groupId: 1,
    amount: 5208,
    paymentDate: '2024-02-01',
    type: 'payment'
  },
  {
    id: 2,
    loanAccountId: 1,
    memberId: 1,
    groupId: 1,
    amount: 5208,
    paymentDate: '2024-02-08',
    type: 'payment'
  },
  {
    id: 3,
    loanAccountId: 2,
    memberId: 2,
    groupId: 1,
    amount: 4425,
    paymentDate: '2024-02-08',
    type: 'payment'
  },
  {
    id: 4,
    loanAccountId: 1,
    memberId: 1,
    groupId: 1,
    amount: 1000,
    paymentDate: '2024-02-15',
    type: 'penalty',
    penaltyPercentage: 5,
    notes: 'Late payment penalty'
  }
];

// Helper functions
export const getMemberById = (id: number): Member | undefined => {
  return mockMembers.find(member => member.id === id);
};

export const getGroupById = (id: number): Group | undefined => {
  return mockGroups.find(group => group.id === id);
};

export const getLoanAccountById = (id: number): LoanAccount | undefined => {
  return mockLoanAccounts.find(loan => loan.id === id);
};

export const getMembersByGroupId = (groupId: number): Member[] => {
  return mockMembers.filter(member => member.groupId === groupId);
};

export const getLoanAccountsByMemberId = (memberId: number): LoanAccount[] => {
  return mockLoanAccounts.filter(loan => loan.memberId === memberId);
};