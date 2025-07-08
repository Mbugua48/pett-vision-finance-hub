import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockGroups } from '@/utils/mockData';
import { useNavigate } from 'react-router-dom';

export const AddMember: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phoneNumber: '',
    address: '',
    groupId: '',
    guarantorName: '',
    guarantorIdNumber: '',
    guarantorPhone: '',
    guarantorAddress: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Member Added Successfully",
        description: `${formData.fullName} has been registered successfully.`,
      });
      navigate('/members');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Add New Member</h1>
        <p className="text-muted-foreground">Register a new client with KYC details</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Member Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="idNumber">ID Number *</Label>
                  <Input
                    id="idNumber"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange('idNumber', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="groupId">Group *</Label>
                  <Select value={formData.groupId} onValueChange={(value) => handleInputChange('groupId', value)}>
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
              </div>
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Guarantor Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Guarantor Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="guarantorName">Guarantor Name *</Label>
                  <Input
                    id="guarantorName"
                    value={formData.guarantorName}
                    onChange={(e) => handleInputChange('guarantorName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="guarantorIdNumber">Guarantor ID Number *</Label>
                  <Input
                    id="guarantorIdNumber"
                    value={formData.guarantorIdNumber}
                    onChange={(e) => handleInputChange('guarantorIdNumber', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="guarantorPhone">Guarantor Phone *</Label>
                  <Input
                    id="guarantorPhone"
                    value={formData.guarantorPhone}
                    onChange={(e) => handleInputChange('guarantorPhone', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="guarantorAddress">Guarantor Address *</Label>
                <Input
                  id="guarantorAddress"
                  value={formData.guarantorAddress}
                  onChange={(e) => handleInputChange('guarantorAddress', e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Adding Member...' : 'Add Member'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};