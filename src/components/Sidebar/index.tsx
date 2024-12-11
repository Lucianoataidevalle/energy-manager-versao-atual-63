import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarContent } from "./SidebarContent";
import { MobileSidebar } from "./MobileSidebar";

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
      <MobileSidebar handleLogout={handleLogout} />
    </>
  );
};

export default Sidebar;