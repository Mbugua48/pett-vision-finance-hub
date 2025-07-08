import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockMembers, mockGroups } from '@/utils/mockData';
import { useNavigate } from 'react-router-dom';

export const AddLoan: React.FC = () => {
  const [formData, setFormData] = useState({
    memberId: '',
    amount: '',
    interestRate: '',
    duration: '',
    startDate: new Date().toISOString().split('T')[0]
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const selectedMember = mockMembers.find(m => m.id === parseInt(formData.memberId));
  const selectedGroup = selectedMember ? mockGroups.find(g => g.id === selectedMember.groupId) : null;

  const calculateLoanDetails = () => {
    const amount = parseFloat(formData.amount) || 0;
    const rate = parseFloat(formData.interestRate) || 0;
    const duration = parseInt(formData.duration) || 0;
    
    const totalAmount = amount + (amount * rate / 100);
    const weeklyPayment = duration > 0 ? totalAmount / (duration * 4) : 0;
    
    return { totalAmount, weeklyPayment };
  };

  const { totalAmount, weeklyPayment } = calculateLoanDetails();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: "Loan Account Created",
        description: `Loan for ${selectedMember?.fullName} has been created successfully.`,
      });
      navigate('/loan-accounts');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Add New Loan</h1>
        <p className="text-muted-foreground">Create a new loan account for a member</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="memberId">Select Member *</Label>
                <Select value={formData.memberId} onValueChange={(value) => handleInputChange('memberId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a member" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockMembers.map(member => (
                      <SelectItem key={member.id} value={member.id.toString()}>
                        {member.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedGroup && (
                  <p className="text-sm text-muted-foreground mt-1">Group: {selectedGroup.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="amount">Loan Amount (KES) *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="interestRate">Interest Rate *</Label>
                <Select value={formData.interestRate} onValueChange={(value) => handleInputChange('interestRate', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select interest rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18">18% (2 months)</SelectItem>
                    <SelectItem value="25">25% (3 months)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration (Months) *</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Months</SelectItem>
                    <SelectItem value="3">3 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="startDate">Loan Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  required
                />
              </div>
            </div>

            {formData.amount && formData.interestRate && formData.duration && (
              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-3">Loan Summary</h3>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="flex justify-between">
                      <span>Principal Amount:</span>
                      <span>KES {parseFloat(formData.amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest ({formData.interestRate}%):</span>
                      <span>KES {(parseFloat(formData.amount) * parseFloat(formData.interestRate) / 100).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Amount:</span>
                      <span>KES {totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-primary font-medium">
                      <span>Weekly Payment:</span>
                      <span>KES {weeklyPayment.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Loan...' : 'Create Loan Account'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};