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

const InvoiceForm = ({ onCompanyChange, onUnitChange }: InvoiceFormProps) => {
  const { companies, consumerUnits } = useData();
  const { formData, setFormData, handleSubmit } = useInvoiceForm(
    onCompanyChange,
    onUnitChange
  );

  const availableUnits = consumerUnits.filter(
    (unit) => unit.empresa === formData.empresa
  );

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Dados da Fatura</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CompanySelect
              companies={companies}
              value={formData.empresa}
              onChange={(value) => {
                setFormData({ ...formData, empresa: value, unidade: "" });
                onCompanyChange(value);
              }}
            />
            <UnitSelect
              availableUnits={availableUnits}
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
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;