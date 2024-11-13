import { Input } from "@/components/ui/input";

interface BillingInputsProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const BillingInputs = ({ formData, setFormData }: BillingInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label htmlFor="multasJuros">Multas/Juros (R$)</label>
        <Input
          id="multasJuros"
          type="number"
          step="0.01"
          value={formData.multasJuros}
          onChange={(e) =>
            setFormData({ ...formData, multasJuros: e.target.value })
          }
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="valorFatura">Valor da Fatura (R$)</label>
        <Input
          id="valorFatura"
          type="number"
          step="0.01"
          value={formData.valorFatura}
          onChange={(e) =>
            setFormData({ ...formData, valorFatura: e.target.value })
          }
          required
        />
      </div>
    </div>
  );
};