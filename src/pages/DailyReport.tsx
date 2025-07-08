import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockTransactions, mockDisbursements } from '@/utils/mockData';
import { Calendar, DollarSign, AlertTriangle, Banknote, FileText } from 'lucide-react';

export const DailyReport: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Calculate daily statistics
  const dailyTransactions = mockTransactions.filter(t => t.paymentDate === selectedDate);
  const dailyPayments = dailyTransactions.filter(t => t.type === 'payment');
  const dailyPenalties = dailyTransactions.filter(t => t.type === 'penalty');
  const dailyDisbursements = mockDisbursements.filter(d => d.disbursementDate === selectedDate);

  const totalCollections = dailyPayments.reduce((sum, t) => sum + t.amount, 0);
  const totalPenalties = dailyPenalties.reduce((sum, t) => sum + t.amount, 0);
  const totalDisbursements = dailyDisbursements.reduce((sum, d) => sum + d.amount, 0);

  const reportData = [
    {
      title: 'Total Collections',
      value: `KES ${totalCollections.toLocaleString()}`,
      count: dailyPayments.length,
      icon: DollarSign,
      color: 'text-success'
    },
    {
      title: 'Penalties Issued',
      value: `KES ${totalPenalties.toLocaleString()}`,
      count: dailyPenalties.length,
      icon: AlertTriangle,
      color: 'text-warning'
    },
    {
      title: 'Disbursements',
      value: `KES ${totalDisbursements.toLocaleString()}`,
      count: dailyDisbursements.length,
      icon: Banknote,
      color: 'text-primary'
    },
    {
      title: 'Total Transactions',
      value: dailyTransactions.length.toString(),
      count: dailyTransactions.length,
      icon: FileText,
      color: 'text-muted-foreground'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Daily Report</h1>
        <p className="text-muted-foreground">View daily activity summary</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="reportDate">Report Date</Label>
              <Input
                id="reportDate"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reportData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                {item.count} transactions
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {dailyTransactions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details for {new Date(selectedDate).toLocaleDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyTransactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted rounded">
                  <div className="flex items-center gap-3">
                    {transaction.type === 'payment' ? (
                      <DollarSign className="h-4 w-4 text-success" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    )}
                    <div>
                      <p className="font-medium">
                        {transaction.type === 'payment' ? 'Payment' : 'Penalty'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Member ID: {transaction.memberId} | Group ID: {transaction.groupId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">KES {transaction.amount.toLocaleString()}</p>
                    {transaction.notes && (
                      <p className="text-xs text-muted-foreground">{transaction.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {dailyTransactions.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No transactions found for this date</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};