import { NavLink } from "react-router-dom";
import { Home, Building2, Factory, FileSpreadsheet, Users } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/empresas"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <Building2 className="w-5 h-5" />
          <span>Empresas</span>
        </NavLink>
        <NavLink
          to="/unidades"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <Factory className="w-5 h-5" />
          <span>Unidades Consumidoras</span>
        </NavLink>
        <NavLink
          to="/faturas"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <FileSpreadsheet className="w-5 h-5" />
          <span>Faturas</span>
        </NavLink>
        <NavLink
          to="/usuarios"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          <Users className="w-5 h-5" />
          <span>Usuários</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;