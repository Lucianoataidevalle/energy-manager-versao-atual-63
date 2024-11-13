import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useData } from "@/contexts/DataContext";
import { CompanySelect } from "./CompanySelect";
import { UnitSelect } from "./UnitSelect";
import { ConsumptionInputs } from "./ConsumptionInputs";
import { DemandInputs } from "./DemandInputs";
import { ReactiveInputs } from "./ReactiveInputs";
import { BillingInputs } from "./BillingInputs";
import { InvoiceFormProps } from "./types";
import { useInvoiceForm } from "./useInvoiceForm";
import { Button } from "@/components/ui/button";

const InvoiceForm = ({ onCompanyChange, onUnitChange }: InvoiceFormProps) => {
  const { consumerUnits } = useData();
  const { formData, setFormData, handleSubmit } = useInvoiceForm(
    onCompanyChange,
    onUnitChange
  );

  const availableUnits = consumerUnits.filter(
    (unit) => unit.empresa === formData.empresa
  );

  return (
    <Card className="mb-8 w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Dados da Fatura</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
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

          <ConsumptionInputs formData={formData} setFormData={setFormData} />
          <DemandInputs formData={formData} setFormData={setFormData} />
          <ReactiveInputs formData={formData} setFormData={setFormData} />
          <BillingInputs formData={formData} setFormData={setFormData} />

          <Button type="submit" className="w-full">
            {formData.id ? "Atualizar Fatura" : "Inserir Fatura"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;