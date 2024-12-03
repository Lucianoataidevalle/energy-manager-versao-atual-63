import { Input } from "@/components/ui/input";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Consumo Fora Ponta (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.custoConsumoForaPonta}
          onChange={(e) => setFormData({ ...formData, custoConsumoForaPonta: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Consumo Ponta (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.custoConsumoPonta}
          onChange={(e) => setFormData({ ...formData, custoConsumoPonta: e.target.value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Medida Fora Ponta (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.custoDemandaMedidaForaPonta}
          onChange={(e) => setFormData({ ...formData, custoDemandaMedidaForaPonta: e.target.value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Medida Ponta (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.custoDemandaMedidaPonta}
          onChange={(e) => setFormData({ ...formData, custoDemandaMedidaPonta: e.target.value })}
          required
          disabled={isGroupB || shouldDisablePeakFields}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Isenta Fora Ponta (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.custoDemandaIsentaForaPonta}
          onChange={(e) => setFormData({ ...formData, custoDemandaIsentaForaPonta: e.target.value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Isenta Ponta (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.custoDemandaIsentaPonta}
          onChange={(e) => setFormData({ ...formData, custoDemandaIsentaPonta: e.target.value })}
          required
          disabled={isGroupB || shouldDisablePeakFields}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Ultrapassagem Fora Ponta (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.demandaUltrapassagemForaPonta}
          onChange={(e) => setFormData({ ...formData, demandaUltrapassagemForaPonta: e.target.value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Ultrapassagem Ponta (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.demandaUltrapassagemPonta}
          onChange={(e) => setFormData({ ...formData, demandaUltrapassagemPonta: e.target.value })}
          required
          disabled={isGroupB || shouldDisablePeakFields}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Reativa Fora Ponta (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.custoEnergiaReativaForaPonta}
          onChange={(e) => setFormData({ ...formData, custoEnergiaReativaForaPonta: e.target.value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Reativa Ponta (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.custoEnergiaReativaPonta}
          onChange={(e) => setFormData({ ...formData, custoEnergiaReativaPonta: e.target.value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Reativa Fora Ponta (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.custoDemandaReativaForaPonta}
          onChange={(e) => setFormData({ ...formData, custoDemandaReativaForaPonta: e.target.value })}
          required
          disabled={isGroupB}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Reativa Ponta (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.custoDemandaReativaPonta}
          onChange={(e) => setFormData({ ...formData, custoDemandaReativaPonta: e.target.value })}
          required
          disabled={isGroupB || shouldDisablePeakFields}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Injetada Fora Ponta (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.custoEnergiaInjetadaForaPonta}
          onChange={(e) => setFormData({ ...formData, custoEnergiaInjetadaForaPonta: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Injetada Ponta (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.custoEnergiaInjetadaPonta}
          onChange={(e) => setFormData({ ...formData, custoEnergiaInjetadaPonta: e.target.value })}
          required
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