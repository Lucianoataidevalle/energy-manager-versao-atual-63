import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, subMonths } from "date-fns";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { CompanySelect } from "./CompanySelect";
import { UnitSelect } from "./UnitSelect";
import { ConsumptionInputs } from "./ConsumptionInputs";
import { DemandInputs } from "./DemandInputs";
import { BillingInputs } from "./BillingInputs";
import { Button } from "@/components/ui/button";

interface InvoiceFormProps {
  onCompanyChange: (company: string) => void;
  onUnitChange: (unit: string) => void;
}

const InvoiceForm = ({ onCompanyChange, onUnitChange }: InvoiceFormProps) => {
  const { addInvoice, editingInvoice, editInvoice } = useData();
  const [formData, setFormData] = useState({
    empresa: "",
    unidade: "",
    mes: format(subMonths(new Date(), 1), "yyyy-MM"),
    consumoForaPonta: "",
    consumoPonta: "",
    demandaMedida: "",
    demandaUltrapassagem: "",
    valorFatura: "",
  });

  useEffect(() => {
    if (editingInvoice) {
      setFormData({
        empresa: editingInvoice.empresa,
        unidade: editingInvoice.unidade,
        mes: editingInvoice.mes,
        consumoForaPonta: editingInvoice.consumoForaPonta.toString(),
        consumoPonta: editingInvoice.consumoPonta.toString(),
        demandaMedida: editingInvoice.demandaMedida.toString(),
        demandaUltrapassagem: editingInvoice.demandaUltrapassagem.toString(),
        valorFatura: editingInvoice.valorFatura.toString(),
      });
    }
  }, [editingInvoice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const invoiceData = {
      ...formData,
      consumoForaPonta: Number(formData.consumoForaPonta),
      consumoPonta: Number(formData.consumoPonta),
      demandaMedida: Number(formData.demandaMedida),
      demandaUltrapassagem: Number(formData.demandaUltrapassagem),
      valorFatura: Number(formData.valorFatura),
    };

    if (!editingInvoice) {
      addInvoice({
        ...invoiceData,
        id: Date.now(),
      });
      toast.success("Fatura cadastrada com sucesso!", {
        position: "top-right",
      });
    } else {
      editInvoice(editingInvoice.id, invoiceData);
      toast.success("Fatura atualizada com sucesso!", {
        position: "top-right",
      });
    }

    setFormData({
      empresa: "",
      unidade: "",
      mes: format(subMonths(new Date(), 1), "yyyy-MM"),
      consumoForaPonta: "",
      consumoPonta: "",
      demandaMedida: "",
      demandaUltrapassagem: "",
      valorFatura: "",
    });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Dados da Fatura</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CompanySelect
              value={[formData.empresa]}
              onChange={(value) => {
                setFormData({ ...formData, empresa: value[0], unidade: "" });
                onCompanyChange(value[0]);
              }}
            />
            <UnitSelect
              selectedCompany={formData.empresa}
              value={formData.unidade}
              onChange={(value) => {
                setFormData({ ...formData, unidade: value });
                onUnitChange(value);
              }}
            />
            <div className="space-y-2">
              <label>Mês de Referência</label>
              <input
                type="month"
                value={formData.mes}
                onChange={(e) => setFormData({ ...formData, mes: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <ConsumptionInputs
            formData={formData}
            setFormData={setFormData}
          />

          <DemandInputs
            formData={formData}
            setFormData={setFormData}
          />

          <BillingInputs
            formData={formData}
            setFormData={setFormData}
          />

          <Button type="submit" className="w-full">
            {editingInvoice ? "Atualizar Fatura" : "Inserir Fatura"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;