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
    <Card className="w-full p-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold">Dados da Fatura</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              <label className="text-sm font-medium">Mês de Referência</label>
              <Input
                type="month"
                value={formData.mes}
                onChange={(e) => setFormData({ ...formData, mes: e.target.value })}
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Consumo</h3>
              <ConsumptionInputs formData={formData} setFormData={setFormData} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Demanda</h3>
              <DemandInputs formData={formData} setFormData={setFormData} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Energia Reativa</h3>
              <ReactiveInputs formData={formData} setFormData={setFormData} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Valores</h3>
              <BillingInputs formData={formData} setFormData={setFormData} />
            </div>
          </div>

          <Button type="submit" className="w-full">
            {formData.id ? "Atualizar Fatura" : "Inserir Fatura"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;