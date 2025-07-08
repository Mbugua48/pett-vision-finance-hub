import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockGroups, mockMembers, mockLoanAccounts } from '@/utils/mockData';
import { Badge } from '@/components/ui/badge';

export const Transactions: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [payments, setPayments] = useState<{[memberId: number]: { amount: string; penalty: string; notes: string }}>({});
  const { toast } = useToast();

  const selectedGroup = mockGroups.find(g => g.id === parseInt(selectedGroupId));
  const groupMembers = selectedGroupId ? mockMembers.filter(m => m.groupId === parseInt(selectedGroupId)) : [];

  const handlePaymentChange = (memberId: number, field: string, value: string) => {
    setPayments(prev => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        [field]: value
      }
    }));
  };

  const handleSubmitCollections = () => {
    const totalCollected = Object.values(payments).reduce((sum, payment) => sum + parseFloat(payment.amount || '0'), 0);
    
    toast({
      title: "Collections Recorded",
      description: `Total collections of KES ${totalCollected.toLocaleString()} recorded for ${selectedGroup?.name}`,
    });
    
    setPayments({});
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Transactions</h1>
        <p className="text-muted-foreground">Record weekly collections and penalties</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Group for Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="groupSelect">Group</Label>
              <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  {mockGroups.map(group => (
                    <SelectItem key={group.id} value={group.id.toString()}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Collection Date</Label>
              <Input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedGroup && (
        <Card>
          <CardHeader>
            <CardTitle>Collection for {selectedGroup.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {groupMembers.map(member => {
                const memberLoans = mockLoanAccounts.filter(loan => loan.memberId === member.id && loan.status === 'active');
                const expectedPayment = memberLoans.reduce((sum, loan) => sum + loan.weeklyPaymentAmount, 0);
                
                return (
                  <div key={member.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{member.fullName}</h4>
                        <p className="text-sm text-muted-foreground">Expected: KES {expectedPayment.toLocaleString()}</p>
                      </div>
                      <Badge variant={memberLoans.length > 0 ? 'default' : 'secondary'}>
                        {memberLoans.length} Active Loans
                      </Badge>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <Label htmlFor={`payment-${member.id}`}>Payment Amount (KES)</Label>
                        <Input
                          id={`payment-${member.id}`}
                          type="number"
                          placeholder="0.00"
                          value={payments[member.id]?.amount || ''}
                          onChange={(e) => handlePaymentChange(member.id, 'amount', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`penalty-${member.id}`}>Penalty (%)</Label>
                        <Input
                          id={`penalty-${member.id}`}
                          type="number"
                          placeholder="0"
                          value={payments[member.id]?.penalty || ''}
                          onChange={(e) => handlePaymentChange(member.id, 'penalty', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`notes-${member.id}`}>Notes</Label>
                        <Input
                          id={`notes-${member.id}`}
                          placeholder="Optional notes"
                          value={payments[member.id]?.notes || ''}
                          onChange={(e) => handlePaymentChange(member.id, 'notes', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {groupMembers.length > 0 && (
              <div className="mt-6 pt-4 border-t">
                <Button onClick={handleSubmitCollections} className="w-full">
                  Record Collections
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};