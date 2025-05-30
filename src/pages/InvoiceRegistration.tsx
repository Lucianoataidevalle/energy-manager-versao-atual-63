
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import InvoiceForm from "@/components/invoice/InvoiceForm";

const InvoiceRegistration = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 md:ml-64">
        <h1 className="text-2xl font-bold mb-8">Fatura da Distribuidora</h1>
        <InvoiceForm
          onCompanyChange={setSelectedCompany}
          onUnitChange={setSelectedUnit}
        />
      </div>
    </div>
  );
};

export default InvoiceRegistration;
