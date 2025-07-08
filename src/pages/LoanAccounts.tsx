import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockLoanAccounts, mockMembers, mockGroups } from '@/utils/mockData';
import { DollarSign, Calendar, TrendingUp, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoanAccounts: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Loan Accounts</h1>
          <p className="text-muted-foreground">Manage all loan accounts</p>
        </div>
        <Button asChild>
          <Link to="/add-loan">
            <Plus className="h-4 w-4 mr-2" />
            Add Loan
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {mockLoanAccounts.map((loan) => {
          const member = mockMembers.find(m => m.id === loan.memberId);
          const group = mockGroups.find(g => g.id === loan.groupId);
          const progressPercentage = ((loan.paidAmount / loan.totalAmount) * 100).toFixed(1);

          return (
            <Card key={loan.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{member?.fullName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{group?.name}</p>
                  </div>
                  <Badge variant={loan.status === 'active' ? 'default' : 'secondary'}>
                    {loan.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Loan Amount</p>
                      <p className="font-medium">KES {loan.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="font-medium">{loan.interestRate}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{loan.duration} months</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{progressPercentage}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t grid gap-2 md:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-medium">KES {loan.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Paid Amount</p>
                    <p className="font-medium text-success">KES {loan.paidAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="font-medium text-warning">KES {loan.remainingAmount.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};