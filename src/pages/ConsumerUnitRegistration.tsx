import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ConsumerUnitForm from "@/components/consumer-unit/ConsumerUnitForm";
import ConsumerUnitList from "@/components/consumer-unit/ConsumerUnitList";

const ConsumerUnitRegistration = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-2xl font-bold mb-8">
          Cadastro de Unidade Consumidora
        </h1>
        <ConsumerUnitForm />
        <ConsumerUnitList />
      </div>
    </div>
  );
};

export default ConsumerUnitRegistration;