import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  UsersRound, 
  CreditCard, 
  Plus, 
  Banknote, 
  Receipt,
  FileText,
  LogOut
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Members', path: '/members' },
    { icon: UserPlus, label: 'Add Member', path: '/add-member' },
    { icon: UsersRound, label: 'Groups', path: '/groups' },
    { icon: CreditCard, label: 'Loan Accounts', path: '/loan-accounts' },
    { icon: Plus, label: 'Add Loan', path: '/add-loan' },
    { icon: Banknote, label: 'Disbursements', path: '/disbursements' },
    { icon: Receipt, label: 'Transactions', path: '/transactions' },
    { icon: FileText, label: 'Daily Report', path: '/daily-report' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/c5ada5c0-7c01-4325-b4e0-7ca9bbe1e960.png" 
              alt="Pett Vision Logo" 
              className="h-8"
            />
            <div>
              <h1 className="text-lg font-semibold text-primary">Pett Vision</h1>
              <p className="text-sm text-muted-foreground">Microfinance Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-[calc(100vh-72px)]">
          <nav className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};