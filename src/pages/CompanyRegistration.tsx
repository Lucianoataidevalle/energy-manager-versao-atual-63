import Sidebar from "@/components/Sidebar";
import CompanyForm from "@/components/company/CompanyForm";
import CompanyList from "@/components/company/CompanyList";

const CompanyRegistration = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 md:ml-64">
        <h1 className="text-2xl font-bold mb-8">Cadastro de Empresas</h1>
        <CompanyForm />
        <CompanyList />
      </div>
    </div>
  );
};

export default CompanyRegistration;