import { Input } from "@/components/ui/input";

interface ReactiveInputsProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const ReactiveInputs = ({ formData, setFormData }: ReactiveInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Reativa Fora Ponta (kVAr)</label>
        <Input
          type="number"
          value={formData.energiaReativaForaPonta}
          onChange={(e) =>
            setFormData({ ...formData, energiaReativaForaPonta: e.target.value })
          }
          required
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Energia Reativa Ponta (kVAr)</label>
        <Input
          type="number"
          value={formData.energiaReativaPonta}
          onChange={(e) =>
            setFormData({ ...formData, energiaReativaPonta: e.target.value })
          }
          required
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Reativa Fora Ponta (kVAr)</label>
        <Input
          type="number"
          value={formData.demandaReativaForaPonta}
          onChange={(e) =>
            setFormData({ ...formData, demandaReativaForaPonta: e.target.value })
          }
          required
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Demanda Reativa Ponta (kVAr)</label>
        <Input
          type="number"
          value={formData.demandaReativaPonta}
          onChange={(e) =>
            setFormData({ ...formData, demandaReativaPonta: e.target.value })
          }
          required
          className="w-full"
        />
      </div>
    </div>
  );
};