
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { FormHeader } from "./InvoiceForm/FormHeader";
import { ConsumptionTab } from "./InvoiceForm/ConsumptionTab";
import { CostsTab } from "./InvoiceForm/CostsTab";
import { UpdateConfirmDialog } from "./InvoiceForm/UpdateConfirmDialog";
import { useInvoiceForm } from "./InvoiceForm/useInvoiceForm";
import { useEffect, useState } from "react";

interface InvoiceFormProps {
  onCompanyChange: (company: string) => void;
  onUnitChange: (unit: string) => void;
}

const InvoiceForm = ({ onCompanyChange, onUnitChange }: InvoiceFormProps) => {
  const { consumerUnits, editingInvoice } = useData();
  const { formData, setFormData, handleSubmit, validateForm } = useInvoiceForm(onCompanyChange, onUnitChange);
  const [activeTab, setActiveTab] = useState("consumption");

  const availableUnits = consumerUnits.filter((unit) => unit.empresa === formData.empresa);
  const selectedUnit = availableUnits.find(unit => unit.nome === formData.unidade);
  const isGroupB = selectedUnit?.grupoSubgrupo === "B";
  const isGreenTariff = selectedUnit?.modalidadeTarifaria === "Verde";
  const isA3aOrA4 = selectedUnit?.grupoSubgrupo === "A3a" || selectedUnit?.grupoSubgrupo === "A4";
  const shouldDisablePeakFields = isA3aOrA4 && isGreenTariff;

  // Switch to the "Fatura" tab when an invoice is being edited
  useEffect(() => {
    if (editingInvoice) {
      setActiveTab("consumption");
    }
  }, [editingInvoice]);

  const handleFormSubmit = () => {
    const isValid = validateForm();
    if (!isValid) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    handleSubmit();
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Informações da Fatura</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <FormHeader
            formData={formData}
            setFormData={setFormData}
            onCompanyChange={onCompanyChange}
            onUnitChange={onUnitChange}
            availableUnits={availableUnits}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="consumption">Fatura</TabsTrigger>
              <TabsTrigger value="costs">Histórico de Faturas</TabsTrigger>
            </TabsList>
            <TabsContent value="consumption">
              <ConsumptionTab
                formData={formData}
                setFormData={setFormData}
                isGroupB={isGroupB}
                shouldDisablePeakFields={shouldDisablePeakFields}
              />
              
              <div className="mt-6">
                <UpdateConfirmDialog
                  onConfirm={handleFormSubmit}
                  isEditing={!!formData.id}
                  confirmTitle={formData.id ? "Atualizar Fatura" : "Inserir Fatura"}
                  confirmMessage={formData.id 
                    ? "Deseja realmente atualizar esta fatura?"
                    : "Deseja realmente inserir esta fatura?"
                  }
                  buttonText={formData.id ? "Atualizar Fatura" : "Inserir Fatura"}
                />
              </div>
            </TabsContent>
            <TabsContent value="costs">
              <CostsTab
                formData={formData}
                setFormData={setFormData}
                isGroupB={isGroupB}
                shouldDisablePeakFields={shouldDisablePeakFields}
                selectedCompany={formData.empresa}
                selectedUnit={formData.unidade}
                onEditInvoice={() => setActiveTab("consumption")}
              />
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
