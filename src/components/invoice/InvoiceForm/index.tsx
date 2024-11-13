import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format, subMonths } from "date-fns";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { CompanySelect } from "./CompanySelect";
import { UnitSelect } from "./UnitSelect";
import { ConsumptionInputs } from "./ConsumptionInputs";
import { DemandInputs } from "./DemandInputs";
import { ReactiveInputs } from "./ReactiveInputs";
import { BillingInputs } from "./BillingInputs";
import { UpdateConfirmDialog } from "./UpdateConfirmDialog";

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
    demandaMedidaForaPonta: "",
    demandaMedidaPonta: "",
    energiaReativaForaPonta: "",
    energiaReativaPonta: "",
    demandaReativaForaPonta: "",
    demandaReativaPonta: "",
    multasJuros: "",
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
        demandaMedidaForaPonta: editingInvoice.demandaMedidaForaPonta.toString(),
        demandaMedidaPonta: editingInvoice.demandaMedidaPonta.toString(),
        energiaReativaForaPonta: editingInvoice.energiaReativaForaPonta.toString(),
        energiaReativaPonta: editingInvoice.energiaReativaPonta.toString(),
        demandaReativaForaPonta: editingInvoice.demandaReativaForaPonta.toString(),
        demandaReativaPonta: editingInvoice.demandaReativaPonta.toString(),
        multasJuros: editingInvoice.multasJuros.toString(),
        valorFatura: editingInvoice.valorFatura.toString(),
      });
      onCompanyChange(editingInvoice.empresa);
      onUnitChange(editingInvoice.unidade);
    }
  }, [editingInvoice, onCompanyChange, onUnitChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleConfirmSubmit = () => {
    const invoiceData = {
      ...formData,
      consumoForaPonta: Number(formData.consumoForaPonta),
      consumoPonta: Number(formData.consumoPonta),
      demandaMedidaForaPonta: Number(formData.demandaMedidaForaPonta),
      demandaMedidaPonta: Number(formData.demandaMedidaPonta),
      energiaReativaForaPonta: Number(formData.energiaReativaForaPonta),
      energiaReativaPonta: Number(formData.energiaReativaPonta),
      demandaReativaForaPonta: Number(formData.demandaReativaForaPonta),
      demandaReativaPonta: Number(formData.demandaReativaPonta),
      multasJuros: Number(formData.multasJuros),
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
      demandaMedidaForaPonta: "",
      demandaMedidaPonta: "",
      energiaReativaForaPonta: "",
      energiaReativaPonta: "",
      demandaReativaForaPonta: "",
      demandaReativaPonta: "",
      multasJuros: "",
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
              <Input
                type="month"
                value={formData.mes}
                onChange={(e) => setFormData({ ...formData, mes: e.target.value })}
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

          <ReactiveInputs
            formData={formData}
            setFormData={setFormData}
          />

          <BillingInputs
            formData={formData}
            setFormData={setFormData}
          />

          <UpdateConfirmDialog 
            onConfirm={handleConfirmSubmit}
            isEditing={!!editingInvoice}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;