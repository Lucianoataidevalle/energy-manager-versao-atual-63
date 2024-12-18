import { NumberInput } from "@/components/shared/NumberInput";
import { useData } from "@/contexts/DataContext";

interface ConsumptionTabProps {
  formData: any;
  setFormData: (data: any) => void;
  isGroupB: boolean;
  shouldDisablePeakFields: boolean;
}

export const ConsumptionTab = ({
  formData,
  setFormData,
  isGroupB,
  shouldDisablePeakFields,
}: ConsumptionTabProps) => {
  const { consumerUnits } = useData();
  const selectedUnit = consumerUnits.find(unit => unit.nome === formData.unidade);
  const showGenerationFields = selectedUnit?.possuiGeracao;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Consumo Fora Ponta (kWh)</label>
        <NumberInput
          value={formData.consumoForaPonta}
          onChange={(value) => setFormData({ ...formData, consumoForaPonta: value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Consumo Ponta (kWh)</label>
        <NumberInput
          value={formData.consumoPonta}
          onChange={(value) => setFormData({ ...formData, consumoPonta: value })}
          required
          disabled={isGroupB}
        />
      </div>

      {showGenerationFields && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium">Energia Injetada Fora Ponta (kWh)</label>
            <NumberInput
              value={formData.energiaInjetadaForaPonta}
              onChange={(value) => setFormData({ ...formData, energiaInjetadaForaPonta: value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Energia Injetada Ponta (kWh)</label>
            <NumberInput
              value={formData.energiaInjetadaPonta}
              onChange={(value) => setFormData({ ...formData, energiaInjetadaPonta: value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Saldo Acumulado (kWh)</label>
            <NumberInput
              value={formData.saldoAcumulado}
              onChange={(value) => setFormData({ ...formData, saldoAcumulado: value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Geração Total (kWh)</label>
            <NumberInput
              value={formData.geracaoTotal}
              onChange={(value) => setFormData({ ...formData, geracaoTotal: value })}
              required
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Medida Fora Ponta (kW)</label>
        <NumberInput
          value={formData.demandaMedidaForaPonta}
          onChange={(value) => setFormData({ ...formData, demandaMedidaForaPonta: value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Medida Ponta (kW)</label>
        <NumberInput
          value={formData.demandaMedidaPonta}
          onChange={(value) => setFormData({ ...formData, demandaMedidaPonta: value })}
          required
          disabled={isGroupB || shouldDisablePeakFields}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Reativa Fora Ponta (kVArh)</label>
        <NumberInput
          value={formData.energiaReativaForaPonta}
          onChange={(value) => setFormData({ ...formData, energiaReativaForaPonta: value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Reativa Ponta (kVArh)</label>
        <NumberInput
          value={formData.energiaReativaPonta}
          onChange={(value) => setFormData({ ...formData, energiaReativaPonta: value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Reativa Fora Ponta (kVAr)</label>
        <NumberInput
          value={formData.demandaReativaForaPonta}
          onChange={(value) => setFormData({ ...formData, demandaReativaForaPonta: value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Reativa Ponta (kVAr)</label>
        <NumberInput
          value={formData.demandaReativaPonta}
          onChange={(value) => setFormData({ ...formData, demandaReativaPonta: value })}
          required
          disabled={isGroupB || shouldDisablePeakFields}
        />
      </div>
    </div>
  );
};