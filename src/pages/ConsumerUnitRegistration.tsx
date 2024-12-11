import Sidebar from "@/components/Sidebar";
import ConsumerUnitForm from "@/components/consumer-unit/ConsumerUnitForm";
import ConsumerUnitList from "@/components/consumer-unit/ConsumerUnitList";
import { useAuth } from "@/contexts/AuthContext";

const ConsumerUnitRegistration = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 md:ml-64">
        <h1 className="text-2xl font-bold mb-8">
          Cadastro de Unidade Consumidora
        </h1>
        {isAdmin && <ConsumerUnitForm />}
        <ConsumerUnitList />
      </div>
    </div>
  );
};

export default ConsumerUnitRegistration;