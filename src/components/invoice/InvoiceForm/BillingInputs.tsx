import { Input } from "@/components/ui/input";

interface BillingInputsProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const BillingInputs = ({ formData, setFormData }: BillingInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Multas/Juros (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.multasJuros}
          onChange={(e) =>
            setFormData({ ...formData, multasJuros: e.target.value })
          }
          required
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Valor da Fatura (R$)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.valorFatura}
          onChange={(e) =>
            setFormData({ ...formData, valorFatura: e.target.value })
          }
          required
          className="w-full"
        />
      </div>
    </div>
  );
};