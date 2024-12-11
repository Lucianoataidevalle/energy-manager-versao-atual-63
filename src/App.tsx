import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DataProvider } from "./contexts/DataContext";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import CompanyRegistration from "./pages/CompanyRegistration";
import ConsumerUnitRegistration from "./pages/ConsumerUnitRegistration";
import GeneratorUnitRegistration from "./pages/GeneratorUnitRegistration";
import UserRegistration from "./pages/UserRegistration";
import InvoiceRegistration from "./pages/InvoiceRegistration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/relatorio" element={<Report />} />
              <Route path="/empresa" element={<CompanyRegistration />} />
              <Route path="/unidade" element={<ConsumerUnitRegistration />} />
              <Route path="/unidade-geradora" element={<GeneratorUnitRegistration />} />
              <Route path="/usuario" element={<UserRegistration />} />
              <Route path="/faturas" element={<InvoiceRegistration />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;