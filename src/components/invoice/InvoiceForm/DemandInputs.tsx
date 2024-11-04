import { Input } from "@/components/ui/input";

interface DemandInputsProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const DemandInputs = ({ formData, setFormData }: DemandInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label htmlFor="demandaMedida">Demanda Medida (kW)</label>
        <Input
          id="demandaMedida"
          type="number"
          value={formData.demandaMedida}
          onChange={(e) =>
            setFormData({ ...formData, demandaMedida: e.target.value })
          }
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="demandaUltrapassagem">Demanda de Ultrapassagem (kW)</label>
        <Input
          id="demandaUltrapassagem"
          type="number"
          value={formData.demandaUltrapassagem}
          onChange={(e) =>
            setFormData({ ...formData, demandaUltrapassagem: e.target.value })
          }
          required
        />
      </div>
    </div>
  );
};