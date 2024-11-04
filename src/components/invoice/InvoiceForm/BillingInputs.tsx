import { Input } from "@/components/ui/input";

interface BillingInputsProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const BillingInputs = ({ formData, setFormData }: BillingInputsProps) => {
  return (
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
  );
};