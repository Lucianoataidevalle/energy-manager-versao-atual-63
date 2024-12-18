import { NumberInput } from "@/components/shared/NumberInput";

interface CostsTabProps {
  formData: any;
  setFormData: (data: any) => void;
  isGroupB: boolean;
  shouldDisablePeakFields: boolean;
}

export const CostsTab = ({
  formData,
  setFormData,
  isGroupB,
  shouldDisablePeakFields,
}: CostsTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Consumo Fora Ponta (R$)</label>
        <NumberInput
          value={formData.custoConsumoForaPonta}
          onChange={(value) => setFormData({ ...formData, custoConsumoForaPonta: value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Consumo Ponta (R$)</label>
        <NumberInput
          value={formData.custoConsumoPonta}
          onChange={(value) => setFormData({ ...formData, custoConsumoPonta: value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Medida Fora Ponta (R$)</label>
        <NumberInput
          value={formData.custoDemandaMedidaForaPonta}
          onChange={(value) => setFormData({ ...formData, custoDemandaMedidaForaPonta: value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Medida Ponta (R$)</label>
        <NumberInput
          value={formData.custoDemandaMedidaPonta}
          onChange={(value) => setFormData({ ...formData, custoDemandaMedidaPonta: value })}
          required
          disabled={isGroupB || shouldDisablePeakFields}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Isenta Fora Ponta (R$)</label>
        <NumberInput
          value={formData.custoDemandaIsentaForaPonta}
          onChange={(value) => setFormData({ ...formData, custoDemandaIsentaForaPonta: value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Isenta Ponta (R$)</label>
        <NumberInput
          value={formData.custoDemandaIsentaPonta}
          onChange={(value) => setFormData({ ...formData, custoDemandaIsentaPonta: value })}
          required
          disabled={isGroupB || shouldDisablePeakFields}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Ultrapassagem Fora Ponta (R$)</label>
        <NumberInput
          value={formData.demandaUltrapassagemForaPonta}
          onChange={(value) => setFormData({ ...formData, demandaUltrapassagemForaPonta: value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Ultrapassagem Ponta (R$)</label>
        <NumberInput
          value={formData.demandaUltrapassagemPonta}
          onChange={(value) => setFormData({ ...formData, demandaUltrapassagemPonta: value })}
          required
          disabled={isGroupB || shouldDisablePeakFields}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Reativa Fora Ponta (R$)</label>
        <NumberInput
          value={formData.custoEnergiaReativaForaPonta}
          onChange={(value) => setFormData({ ...formData, custoEnergiaReativaForaPonta: value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Reativa Ponta (R$)</label>
        <NumberInput
          value={formData.custoEnergiaReativaPonta}
          onChange={(value) => setFormData({ ...formData, custoEnergiaReativaPonta: value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Reativa Fora Ponta (R$)</label>
        <NumberInput
          value={formData.custoDemandaReativaForaPonta}
          onChange={(value) => setFormData({ ...formData, custoDemandaReativaForaPonta: value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Reativa Ponta (R$)</label>
        <NumberInput
          value={formData.custoDemandaReativaPonta}
          onChange={(value) => setFormData({ ...formData, custoDemandaReativaPonta: value })}
          required
          disabled={isGroupB || shouldDisablePeakFields}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Injetada Fora Ponta (R$)</label>
        <NumberInput
          value={formData.custoEnergiaInjetadaForaPonta}
          onChange={(value) => setFormData({ ...formData, custoEnergiaInjetadaForaPonta: value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Injetada Ponta (R$)</label>
        <NumberInput
          value={formData.custoEnergiaInjetadaPonta}
          onChange={(value) => setFormData({ ...formData, custoEnergiaInjetadaPonta: value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Bandeira Tarifária (R$)</label>
        <NumberInput
          value={formData.bandeiraTarifaria}
          onChange={(value) => setFormData({ ...formData, bandeiraTarifaria: value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Multas/Juros (R$)</label>
        <NumberInput
          value={formData.multasJuros}
          onChange={(value) => setFormData({ ...formData, multasJuros: value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Valor da Fatura (R$)</label>
        <NumberInput
          value={formData.valorFatura}
          onChange={(value) => setFormData({ ...formData, valorFatura: value })}
          required
        />
      </div>
    </div>
  );
};