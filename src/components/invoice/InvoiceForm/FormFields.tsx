import { Input } from "@/components/ui/input";
import { MonthSelector } from "@/components/shared/MonthSelector";
import { CompanySelect } from "./CompanySelect";
import { UnitSelect } from "./UnitSelect";
import { useData } from "@/contexts/DataContext";

interface FormFieldsProps {
  formData: any;
  setFormData: (data: any) => void;
  onCompanyChange: (company: string) => void;
  onUnitChange: (unit: string) => void;
}

export const FormFields = ({ formData, setFormData, onCompanyChange, onUnitChange }: FormFieldsProps) => {
  const { consumerUnits } = useData();
  const availableUnits = consumerUnits.filter((unit) => unit.empresa === formData.empresa);
  const selectedUnit = availableUnits.find(unit => unit.nome === formData.unidade);
  const isGroupB = selectedUnit?.grupoSubgrupo === "B";
  const isGreenTariff = selectedUnit?.modalidadeTarifaria === "Verde";
  const isA3aOrA4 = selectedUnit?.grupoSubgrupo === "A3a" || selectedUnit?.grupoSubgrupo === "A4";
  const shouldDisablePeakFields = isA3aOrA4 && isGreenTariff;

  return (
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

      <div className="space-y-2">
        <label className="text-sm font-medium">Consumo Fora Ponta (kWh)</label>
        <Input
          type="number"
          value={formData.consumoForaPonta}
          onChange={(e) => setFormData({ ...formData, consumoForaPonta: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Consumo Ponta (kWh)</label>
        <Input
          type="number"
          value={formData.consumoPonta}
          onChange={(e) => setFormData({ ...formData, consumoPonta: e.target.value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Medida Fora Ponta (kW)</label>
        <Input
          type="number"
          value={formData.demandaMedidaForaPonta}
          onChange={(e) => setFormData({ ...formData, demandaMedidaForaPonta: e.target.value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Medida Ponta (kW)</label>
        <Input
          type="number"
          value={formData.demandaMedidaPonta}
          onChange={(e) => setFormData({ ...formData, demandaMedidaPonta: e.target.value })}
          required
          disabled={isGroupB || shouldDisablePeakFields}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Reativa Fora Ponta (kVAr)</label>
        <Input
          type="number"
          value={formData.energiaReativaForaPonta}
          onChange={(e) => setFormData({ ...formData, energiaReativaForaPonta: e.target.value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Reativa Ponta (kVAr)</label>
        <Input
          type="number"
          value={formData.energiaReativaPonta}
          onChange={(e) => setFormData({ ...formData, energiaReativaPonta: e.target.value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Reativa Fora Ponta (kVAr)</label>
        <Input
          type="number"
          value={formData.demandaReativaForaPonta}
          onChange={(e) => setFormData({ ...formData, demandaReativaForaPonta: e.target.value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Reativa Ponta (kVAr)</label>
        <Input
          type="number"
          value={formData.demandaReativaPonta}
          onChange={(e) => setFormData({ ...formData, demandaReativaPonta: e.target.value })}
          required
          disabled={isGroupB || shouldDisablePeakFields}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Multas/Juros (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.multasJuros}
          onChange={(e) => setFormData({ ...formData, multasJuros: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Valor da Fatura (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.valorFatura}
          onChange={(e) => setFormData({ ...formData, valorFatura: e.target.value })}
          required
        />
      </div>
    </div>
  );
};