import Sidebar from "@/components/Sidebar";
import GeneratorUnitForm from "@/components/generator-unit/GeneratorUnitForm";
import GeneratorUnitList from "@/components/generator-unit/GeneratorUnitList";
import { useAuth } from "@/contexts/AuthContext";

const GeneratorUnitRegistration = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 md:ml-64">
        <h1 className="text-2xl font-bold mb-8">
          Cadastro de Unidade Geradora
        </h1>
        {isAdmin && <GeneratorUnitForm />}
        <div className="mt-8">
          <GeneratorUnitList />
        </div>
      </div>
    </div>
  );
};

export default GeneratorUnitRegistration;