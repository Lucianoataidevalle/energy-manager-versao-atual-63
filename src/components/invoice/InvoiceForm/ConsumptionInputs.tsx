import { Input } from "@/components/ui/input";

interface ConsumptionInputsProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const ConsumptionInputs = ({ formData, setFormData }: ConsumptionInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Consumo Fora Ponta (kWh)</label>
        <Input
          type="number"
          value={formData.consumoForaPonta}
          onChange={(e) =>
            setFormData({ ...formData, consumoForaPonta: e.target.value })
          }
          required
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Consumo Ponta (kWh)</label>
        <Input
          type="number"
          value={formData.consumoPonta}
          onChange={(e) =>
            setFormData({ ...formData, consumoPonta: e.target.value })
          }
          required
          className="w-full"
        />
      </div>
    </div>
  );
};