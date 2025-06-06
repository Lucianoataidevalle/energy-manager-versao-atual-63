import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  BarChart3,
  Building2,
  Zap,
  User,
  LogOut,
  Sun,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";

export const SidebarContent = ({ handleLogout }: { handleLogout: () => void }) => {
  const { user, isAdmin } = useAuth();
  const { companies, consumerUnits } = useData();

  // Filter companies based on user permissions
  const userCompanies = isAdmin 
    ? companies 
    : companies.filter(company => user?.empresas?.includes(company.razaoSocial));

  // Filter consumer units based on user permissions
  const userUnits = isAdmin 
    ? consumerUnits 
    : consumerUnits.filter(unit => user?.unidadesConsumidoras?.includes(unit.numero));

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-xl font-bold text-center">Sistema de Gestão de Energia</h1>
      </div>
      
      <nav className="space-y-2 flex-1">
        <Link
          to="/dashboard"
          className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Accordion type="single" collapsible>
          <AccordionItem value="cadastro">
            <AccordionTrigger className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded">
              <FileText size={20} />
              <span>Cadastro</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2 pl-8">
                {(isAdmin || userCompanies.length > 0) && (
                  <Link
                    to="/empresa"
                    className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded"
                  >
                    <Building2 size={20} />
                    <span>Empresa</span>
                  </Link>
                )}
                {(isAdmin || userUnits.length > 0) && (
                  <>
                    <Link
                      to="/unidade"
                      className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded"
                    >
                      <Zap size={20} />
                      <span>Unidade Consumidora</span>
                    </Link>
                    <Link
                      to="/unidade-geradora"
                      className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded"
                    >
                      <Sun size={20} />
                      <span>Unidade Geradora</span>
                    </Link>
                  </>
                )}
                {isAdmin && (
                  <Link
                    to="/usuario"
                    className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded"
                  >
                    <User size={20} />
                    <span>Usuário</span>
                  </Link>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Link
          to="/faturas"
          className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded"
        >
          <ClipboardList size={20} />
          <span>Faturas</span>
        </Link>

        <Link
          to="/relatorio"
          className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded"
        >
          <BarChart3 size={20} />
          <span>Relatórios</span>
        </Link>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="px-4 py-2">
          <p className="text-sm font-medium">{user?.nome || 'Usuário'}</p>
          <p className="text-xs text-gray-400">{user?.email || 'email@exemplo.com'}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
};