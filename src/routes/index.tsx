import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Report from "@/pages/Report";
import CompanyRegistration from "@/pages/CompanyRegistration";
import ConsumerUnitRegistration from "@/pages/ConsumerUnitRegistration";
import GeneratorUnitRegistration from "@/pages/GeneratorUnitRegistration";
import UserRegistration from "@/pages/UserRegistration";
import InvoiceRegistration from "@/pages/InvoiceRegistration";
import { useAuth } from "@/contexts/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/relatorio"
        element={
          <PrivateRoute>
            <Report />
          </PrivateRoute>
        }
      />
      <Route
        path="/empresa"
        element={
          <PrivateRoute>
            <CompanyRegistration />
          </PrivateRoute>
        }
      />
      <Route
        path="/unidade"
        element={
          <PrivateRoute>
            <ConsumerUnitRegistration />
          </PrivateRoute>
        }
      />
      <Route
        path="/unidade-geradora"
        element={
          <PrivateRoute>
            <GeneratorUnitRegistration />
          </PrivateRoute>
        }
      />
      <Route
        path="/usuario"
        element={
          <PrivateRoute>
            <UserRegistration />
          </PrivateRoute>
        }
      />
      <Route
        path="/faturas"
        element={
          <PrivateRoute>
            <InvoiceRegistration />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;