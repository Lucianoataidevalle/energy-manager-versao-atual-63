import { Input } from "@/components/ui/input";
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

      {showGenerationFields && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium">Energia Injetada Fora Ponta (kWh)</label>
            <Input
              type="number"
              value={formData.energiaInjetadaForaPonta}
              onChange={(e) => setFormData({ ...formData, energiaInjetadaForaPonta: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Energia Injetada Ponta (kWh)</label>
            <Input
              type="number"
              value={formData.energiaInjetadaPonta}
              onChange={(e) => setFormData({ ...formData, energiaInjetadaPonta: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Saldo Acumulado (kWh)</label>
            <Input
              type="number"
              value={formData.saldoAcumulado}
              onChange={(e) => setFormData({ ...formData, saldoAcumulado: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Geração Total (kWh)</label>
            <Input
              type="number"
              value={Number(formData.energiaInjetadaForaPonta || 0) + Number(formData.energiaInjetadaPonta || 0)}
              disabled
              className="bg-gray-100"
            />
          </div>
        </>
      )}

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
        <label className="text-sm font-medium">Energia Reativa Fora Ponta (kVArh)</label>
        <Input
          type="number"
          value={formData.energiaReativaForaPonta}
          onChange={(e) => setFormData({ ...formData, energiaReativaForaPonta: e.target.value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Reativa Ponta (kVArh)</label>
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
    </div>
  );
};