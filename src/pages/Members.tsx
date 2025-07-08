import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockMembers, mockGroups, getMemberById, getGroupById } from '@/utils/mockData';
import { Phone, MapPin, CreditCard, Users } from 'lucide-react';

export const Members: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Members</h1>
        <p className="text-muted-foreground">Manage all registered clients</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockMembers.map((member) => {
          const group = getGroupById(member.groupId);
          return (
            <Card key={member.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{member.fullName}</CardTitle>
                  <Badge variant="secondary">{group?.name}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>{member.idNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{member.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{member.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Joined: {new Date(member.registrationDate).toLocaleDateString()}</span>
                </div>
                
                <div className="border-t pt-3">
                  <h4 className="font-medium text-sm mb-2">Guarantor Details</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{member.guarantorName}</p>
                    <p>{member.guarantorIdNumber}</p>
                    <p>{member.guarantorPhone}</p>
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