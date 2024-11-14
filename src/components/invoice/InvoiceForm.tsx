import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, subMonths } from "date-fns";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { FormFields } from "./InvoiceForm/FormFields";
import { UpdateConfirmDialog } from "./InvoiceForm/UpdateConfirmDialog";

interface InvoiceFormProps {
  onCompanyChange: (company: string) => void;
  onUnitChange: (unit: string) => void;
}

const InvoiceForm = ({ onCompanyChange, onUnitChange }: InvoiceFormProps) => {
  const { addInvoice, editingInvoice, editInvoice, invoices } = useData();
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
    }
  }, [editingInvoice]);

  const handleSubmit = () => {
    const invoiceData = {
      empresa: formData.empresa,
      unidade: formData.unidade,
      mes: formData.mes,
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

    // Check for duplicate invoice
    const isDuplicate = invoices.some(
      invoice =>
        invoice.unidade === formData.unidade &&
        invoice.mes === formData.mes &&
        (!editingInvoice || invoice.id !== editingInvoice.id)
    );

    if (isDuplicate) {
      toast.error("Já existe uma fatura cadastrada para esta unidade neste mês!");
      return;
    }

    if (!editingInvoice) {
      addInvoice(invoiceData);
      toast.success("Fatura cadastrada com sucesso!");
    } else {
      editInvoice(editingInvoice.id, invoiceData);
      toast.success("Fatura atualizada com sucesso!");
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
        <CardTitle>Informações da Fatura</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <FormFields
            formData={formData}
            setFormData={setFormData}
            onCompanyChange={onCompanyChange}
            onUnitChange={onUnitChange}
          />
          <UpdateConfirmDialog
            onConfirm={handleSubmit}
            isEditing={!!editingInvoice}
            confirmTitle={editingInvoice ? "Atualizar Fatura" : "Inserir Fatura"}
            confirmMessage={editingInvoice 
              ? "Deseja realmente atualizar esta fatura?"
              : "Deseja realmente inserir esta fatura?"
            }
            buttonText={editingInvoice ? "Atualizar Fatura" : "Inserir Fatura"}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
