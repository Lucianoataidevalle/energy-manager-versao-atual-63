import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  BarChart3,
  Building2,
  Zap,
  User,
  LogOut,
  Menu,
  Sun,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";

const SidebarContent = ({ handleLogout }: { handleLogout: () => void }) => {
  const { user } = useAuth();

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
                <Link
                  to="/empresa"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded"
                >
                  <Building2 size={20} />
                  <span>Empresa</span>
                </Link>
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
                <Link
                  to="/usuario"
                  className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded"
                >
                  <User size={20} />
                  <span>Usuário</span>
                </Link>
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

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-50 md:w-64 md:flex md:flex-col bg-gray-900 text-white p-4">
        <SidebarContent handleLogout={handleLogout} />
      </div>

      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white flex items-center justify-between px-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-gray-900 text-white">
            <SidebarContent handleLogout={handleLogout} />
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-bold">Sistema de Gestão de Energia</h1>
        <div className="w-10" />
      </div>

      <div className="md:hidden h-16" />
    </>
  );
};

export default Sidebar;