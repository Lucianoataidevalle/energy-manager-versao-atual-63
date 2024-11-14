import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import InvoiceList from "@/components/invoice/InvoiceList";

const InvoiceRegistration = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 md:ml-64">
        <h1 className="text-2xl font-bold mb-8">Fatura da Distribuidora</h1>
        <InvoiceForm
          onCompanyChange={setSelectedCompany}
          onUnitChange={setSelectedUnit}
        />
        <InvoiceList selectedCompany={selectedCompany} selectedUnit={selectedUnit} />
      </div>
    </div>
  );
};

export default InvoiceRegistration;