import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Dashboard } from "@/pages/Dashboard";
import { Members } from "@/pages/Members";
import { AddMember } from "@/pages/AddMember";
import { Groups } from "@/pages/Groups";
import { AddGroup } from "@/pages/AddGroup";
import { LoanAccounts } from "@/pages/LoanAccounts";
import { AddLoan } from "@/pages/AddLoan";
import { Disbursements } from "@/pages/Disbursements";
import { Transactions } from "@/pages/Transactions";
import { DailyReport } from "@/pages/DailyReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/add-group" element={<AddGroup />} />
        <Route path="/loan-accounts" element={<LoanAccounts />} />
        <Route path="/add-loan" element={<AddLoan />} />
        <Route path="/disbursements" element={<Disbursements />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/daily-report" element={<DailyReport />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DashboardLayout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
