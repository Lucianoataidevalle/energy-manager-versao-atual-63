import { Input } from "@/components/ui/input";

interface ReactiveInputsProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const ReactiveInputs = ({ formData, setFormData }: ReactiveInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label htmlFor="energiaReativaForaPonta">Energia Reativa Fora Ponta (kVAr)</label>
        <Input
          id="energiaReativaForaPonta"
          type="number"
          value={formData.energiaReativaForaPonta}
          onChange={(e) =>
            setFormData({ ...formData, energiaReativaForaPonta: e.target.value })
          }
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="energiaReativaPonta">Energia Reativa Ponta (kVAr)</label>
        <Input
          id="energiaReativaPonta"
          type="number"
          value={formData.energiaReativaPonta}
          onChange={(e) =>
            setFormData({ ...formData, energiaReativaPonta: e.target.value })
          }
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="demandaReativaForaPonta">Demanda Reativa Fora Ponta (kVAr)</label>
        <Input
          id="demandaReativaForaPonta"
          type="number"
          value={formData.demandaReativaForaPonta}
          onChange={(e) =>
            setFormData({ ...formData, demandaReativaForaPonta: e.target.value })
          }
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="demandaReativaPonta">Demanda Reativa Ponta (kVAr)</label>
        <Input
          id="demandaReativaPonta"
          type="number"
          value={formData.demandaReativaPonta}
          onChange={(e) =>
            setFormData({ ...formData, demandaReativaPonta: e.target.value })
          }
          required
        />
      </div>
    </div>
  );
};