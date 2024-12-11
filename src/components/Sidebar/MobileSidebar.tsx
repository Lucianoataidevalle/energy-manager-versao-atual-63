import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "./SidebarContent";

interface MobileSidebarProps {
  handleLogout: () => void;
}

export const MobileSidebar = ({ handleLogout }: MobileSidebarProps) => {
  return (
    <>
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