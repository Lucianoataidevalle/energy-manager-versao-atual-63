import { Input } from "@/components/ui/input";

interface DemandInputsProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const DemandInputs = ({ formData, setFormData }: DemandInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Medida Fora Ponta (kW)</label>
        <Input
          type="number"
          value={formData.demandaMedidaForaPonta}
          onChange={(e) =>
            setFormData({ ...formData, demandaMedidaForaPonta: e.target.value })
          }
          required
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Medida Ponta (kW)</label>
        <Input
          type="number"
          value={formData.demandaMedidaPonta}
          onChange={(e) =>
            setFormData({ ...formData, demandaMedidaPonta: e.target.value })
          }
          required
          className="w-full"
        />
      </div>
    </div>
  );
};