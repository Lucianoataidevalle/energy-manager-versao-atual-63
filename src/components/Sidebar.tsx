import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  BarChart3,
  Building2,
  Zap,
  User,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 min-h-screen w-64 bg-gray-900 text-white p-4 overflow-y-auto">
      <h1 className="text-xl font-bold mb-8">Sistema de Gestão de Energia</h1>
      <nav className="space-y-2">
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
          to="/relatorios"
          className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded"
        >
          <BarChart3 size={20} />
          <span>Relatórios</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
