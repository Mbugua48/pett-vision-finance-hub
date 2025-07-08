import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  UsersRound, 
  Banknote, 
  AlertTriangle,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { mockMembers, mockGroups, mockLoanAccounts, mockTransactions } from '@/utils/mockData';

export const Dashboard: React.FC = () => {
  // Calculate KPIs
  const activeLoans = mockLoanAccounts.filter(loan => loan.status === 'active').length;
  const totalGroups = mockGroups.length;
  
  // Calculate today's collections (mock data for today)
  const today = new Date().toISOString().split('T')[0];
  const todayTransactions = mockTransactions.filter(t => 
    t.paymentDate === today && t.type === 'payment'
  );
  const todayCollections = todayTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  // Calculate penalties issued
  const penalties = mockTransactions.filter(t => t.type === 'penalty').length;
  
  // Calculate total portfolio
  const totalPortfolio = mockLoanAccounts.reduce((sum, loan) => sum + loan.amount, 0);
  
  // Calculate total outstanding
  const totalOutstanding = mockLoanAccounts.reduce((sum, loan) => sum + loan.remainingAmount, 0);

  const kpiCards = [
    {
      title: 'Active Loans',
      value: activeLoans,
      icon: Banknote,
      color: 'text-primary'
    },
    {
      title: 'Total Groups',
      value: totalGroups,
      icon: UsersRound,
      color: 'text-accent'
    },
    {
      title: 'Today\'s Collections',
      value: `KES ${todayCollections.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-success'
    },
    {
      title: 'Penalties Issued',
      value: penalties,
      icon: AlertTriangle,
      color: 'text-warning'
    },
    {
      title: 'Total Portfolio',
      value: `KES ${totalPortfolio.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-primary'
    },
    {
      title: 'Outstanding Amount',
      value: `KES ${totalOutstanding.toLocaleString()}`,
      icon: Banknote,
      color: 'text-muted-foreground'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your microfinance operations</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpiCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockLoanAccounts.slice(0, 5).map((loan) => {
                const member = mockMembers.find(m => m.id === loan.memberId);
                return (
                  <div key={loan.id} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div>
                      <p className="font-medium">{member?.fullName}</p>
                      <p className="text-sm text-muted-foreground">KES {loan.amount.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-success">{loan.interestRate}%</p>
                      <p className="text-xs text-muted-foreground">{loan.duration} months</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Group Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockGroups.map((group) => {
                const groupMembers = mockMembers.filter(m => m.groupId === group.id);
                const groupLoans = mockLoanAccounts.filter(l => l.groupId === group.id);
                const totalAmount = groupLoans.reduce((sum, loan) => sum + loan.amount, 0);
                
                return (
                  <div key={group.id} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-sm text-muted-foreground">{groupMembers.length} members</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">KES {totalAmount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{groupLoans.length} loans</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};