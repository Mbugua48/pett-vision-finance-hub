import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockDisbursements, mockMembers, mockGroups, mockLoanAccounts } from '@/utils/mockData';
import { Calendar, DollarSign, Users, CreditCard } from 'lucide-react';

export const Disbursements: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Disbursements</h1>
        <p className="text-muted-foreground">Track all disbursed loans</p>
      </div>

      <div className="grid gap-4">
        {mockDisbursements.map(disbursement => {
          const member = mockMembers.find(m => m.id === disbursement.memberId);
          const group = mockGroups.find(g => g.id === disbursement.groupId);
          const loanAccount = mockLoanAccounts.find(l => l.id === disbursement.loanAccountId);
          
          return (
            <Card key={disbursement.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{member?.fullName}</CardTitle>
                  <Badge variant="default">Disbursed</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-success" />
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-medium">KES {disbursement.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{new Date(disbursement.disbursementDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Group</p>
                      <p className="font-medium">{group?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="font-medium">{loanAccount?.interestRate}%</p>
                    </div>
                  </div>
                </div>
                
                {loanAccount && (
                  <div className="mt-4 pt-4 border-t grid gap-2 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Repayable</p>
                      <p className="font-medium">KES {loanAccount.totalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{loanAccount.duration} months</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weekly Payment</p>
                      <p className="font-medium">KES {loanAccount.weeklyPaymentAmount.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};