import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, subMonths } from "date-fns";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { CompanySelect } from "./InvoiceForm/CompanySelect";
import { UnitSelect } from "./InvoiceForm/UnitSelect";
import { MonthSelector } from "@/components/shared/MonthSelector";
import { ConsumptionTab } from "./InvoiceForm/ConsumptionTab";
import { CostsTab } from "./InvoiceForm/CostsTab";
import { UpdateConfirmDialog } from "./InvoiceForm/UpdateConfirmDialog";

interface InvoiceFormProps {
  onCompanyChange: (company: string) => void;
  onUnitChange: (unit: string) => void;
}

const InvoiceForm = ({ onCompanyChange, onUnitChange }: InvoiceFormProps) => {
  const { addInvoice, editingInvoice, editInvoice, invoices, consumerUnits } = useData();
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
    energiaInjetadaForaPonta: "",
    energiaInjetadaPonta: "",
    saldoAcumulado: "",
    custoConsumoForaPonta: "",
    custoConsumoPonta: "",
    custoDemandaMedidaForaPonta: "",
    custoDemandaMedidaPonta: "",
    custoDemandaIsentaForaPonta: "",
    custoDemandaIsentaPonta: "",
    demandaUltrapassagemForaPonta: "",
    demandaUltrapassagemPonta: "",
    custoEnergiaReativaForaPonta: "",
    custoEnergiaReativaPonta: "",
    custoDemandaReativaForaPonta: "",
    custoDemandaReativaPonta: "",
    custoEnergiaInjetadaForaPonta: "",
    custoEnergiaInjetadaPonta: "",
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
        energiaInjetadaForaPonta: editingInvoice.energiaInjetadaForaPonta?.toString() || "",
        energiaInjetadaPonta: editingInvoice.energiaInjetadaPonta?.toString() || "",
        saldoAcumulado: editingInvoice.saldoAcumulado?.toString() || "",
        custoConsumoForaPonta: editingInvoice.custoConsumoForaPonta?.toString() || "",
        custoConsumoPonta: editingInvoice.custoConsumoPonta?.toString() || "",
        custoDemandaMedidaForaPonta: editingInvoice.custoDemandaMedidaForaPonta?.toString() || "",
        custoDemandaMedidaPonta: editingInvoice.custoDemandaMedidaPonta?.toString() || "",
        custoDemandaIsentaForaPonta: editingInvoice.custoDemandaIsentaForaPonta?.toString() || "",
        custoDemandaIsentaPonta: editingInvoice.custoDemandaIsentaPonta?.toString() || "",
        demandaUltrapassagemForaPonta: editingInvoice.demandaUltrapassagemForaPonta.toString(),
        demandaUltrapassagemPonta: editingInvoice.demandaUltrapassagemPonta.toString(),
        custoEnergiaReativaForaPonta: editingInvoice.custoEnergiaReativaForaPonta?.toString() || "",
        custoEnergiaReativaPonta: editingInvoice.custoEnergiaReativaPonta?.toString() || "",
        custoDemandaReativaForaPonta: editingInvoice.custoDemandaReativaForaPonta?.toString() || "",
        custoDemandaReativaPonta: editingInvoice.custoDemandaReativaPonta?.toString() || "",
        custoEnergiaInjetadaForaPonta: editingInvoice.custoEnergiaInjetadaForaPonta?.toString() || "",
        custoEnergiaInjetadaPonta: editingInvoice.custoEnergiaInjetadaPonta?.toString() || "",
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
      energiaInjetadaForaPonta: Number(formData.energiaInjetadaForaPonta),
      energiaInjetadaPonta: Number(formData.energiaInjetadaPonta),
      saldoAcumulado: Number(formData.saldoAcumulado),
      custoConsumoForaPonta: Number(formData.custoConsumoForaPonta),
      custoConsumoPonta: Number(formData.custoConsumoPonta),
      custoDemandaMedidaForaPonta: Number(formData.custoDemandaMedidaForaPonta),
      custoDemandaMedidaPonta: Number(formData.custoDemandaMedidaPonta),
      custoDemandaIsentaForaPonta: Number(formData.custoDemandaIsentaForaPonta),
      custoDemandaIsentaPonta: Number(formData.custoDemandaIsentaPonta),
      demandaUltrapassagemForaPonta: Number(formData.demandaUltrapassagemForaPonta),
      demandaUltrapassagemPonta: Number(formData.demandaUltrapassagemPonta),
      custoEnergiaReativaForaPonta: Number(formData.custoEnergiaReativaForaPonta),
      custoEnergiaReativaPonta: Number(formData.custoEnergiaReativaPonta),
      custoDemandaReativaForaPonta: Number(formData.custoDemandaReativaForaPonta),
      custoDemandaReativaPonta: Number(formData.custoDemandaReativaPonta),
      custoEnergiaInjetadaForaPonta: Number(formData.custoEnergiaInjetadaForaPonta),
      custoEnergiaInjetadaPonta: Number(formData.custoEnergiaInjetadaPonta),
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
      energiaInjetadaForaPonta: "",
      energiaInjetadaPonta: "",
      saldoAcumulado: "",
      custoConsumoForaPonta: "",
      custoConsumoPonta: "",
      custoDemandaMedidaForaPonta: "",
      custoDemandaMedidaPonta: "",
      custoDemandaIsentaForaPonta: "",
      custoDemandaIsentaPonta: "",
      demandaUltrapassagemForaPonta: "",
      demandaUltrapassagemPonta: "",
      custoEnergiaReativaForaPonta: "",
      custoEnergiaReativaPonta: "",
      custoDemandaReativaForaPonta: "",
      custoDemandaReativaPonta: "",
      custoEnergiaInjetadaForaPonta: "",
      custoEnergiaInjetadaPonta: "",
      multasJuros: "",
      valorFatura: "",
    });
  };

  const availableUnits = consumerUnits.filter((unit) => unit.empresa === formData.empresa);
  const selectedUnit = availableUnits.find(unit => unit.nome === formData.unidade);
  const isGroupB = selectedUnit?.grupoSubgrupo === "B";
  const isGreenTariff = selectedUnit?.modalidadeTarifaria === "Verde";
  const isA3aOrA4 = selectedUnit?.grupoSubgrupo === "A3a" || selectedUnit?.grupoSubgrupo === "A4";
  const shouldDisablePeakFields = isA3aOrA4 && isGreenTariff;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Informações da Fatura</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CompanySelect
              value={formData.empresa}
              onChange={(value) => {
                setFormData({ ...formData, empresa: value, unidade: "" });
                onCompanyChange(value);
              }}
            />
            <UnitSelect
              units={availableUnits}
              value={formData.unidade}
              onChange={(value) => {
                setFormData({ ...formData, unidade: value });
                onUnitChange(value);
              }}
            />
            <MonthSelector
              value={formData.mes}
              onChange={(value) => setFormData({ ...formData, mes: value })}
            />
          </div>

          <Tabs defaultValue="consumption" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="consumption">Consumo/Geração</TabsTrigger>
              <TabsTrigger value="costs">Custos/Compensação</TabsTrigger>
            </TabsList>
            <TabsContent value="consumption">
              <ConsumptionTab
                formData={formData}
                setFormData={setFormData}
                isGroupB={isGroupB}
                shouldDisablePeakFields={shouldDisablePeakFields}
              />
            </TabsContent>
            <TabsContent value="costs">
              <CostsTab
                formData={formData}
                setFormData={setFormData}
                isGroupB={isGroupB}
                shouldDisablePeakFields={shouldDisablePeakFields}
              />
            </TabsContent>
          </Tabs>

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