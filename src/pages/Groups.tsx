import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockGroups, mockMembers } from '@/utils/mockData';
import { Users, Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Groups: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Groups</h1>
          <p className="text-muted-foreground">Manage lending groups</p>
        </div>
        <Button asChild>
          <Link to="/add-group">
            <Plus className="h-4 w-4 mr-2" />
            Add Group
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockGroups.map((group) => {
          const groupMembers = mockMembers.filter(m => m.groupId === group.id);
          return (
            <Card key={group.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <Badge variant="outline">{groupMembers.length} members</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Registered: {new Date(group.registrationDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Active Members: {groupMembers.length}</span>
                </div>
                
                <div className="border-t pt-3">
                  <h4 className="font-medium text-sm mb-2">Members</h4>
                  <div className="space-y-1">
                    {groupMembers.slice(0, 3).map(member => (
                      <div key={member.id} className="text-sm text-muted-foreground">
                        {member.fullName}
                      </div>
                    ))}
                    {groupMembers.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{groupMembers.length - 3} more
                      </div>
                    )}
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