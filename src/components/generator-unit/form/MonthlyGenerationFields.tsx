import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface MonthlyGenerationFieldsProps {
  formData: {
    estimativaGeracao: {
      [key: string]: string;
    };
  };
  setFormData: (data: any) => void;
}

export const MonthlyGenerationFields = ({ formData, setFormData }: MonthlyGenerationFieldsProps) => {
  const months = {
    janeiro: "Janeiro",
    fevereiro: "Fevereiro",
    marco: "Março",
    abril: "Abril",
    maio: "Maio",
    junho: "Junho",
    julho: "Julho",
    agosto: "Agosto",
    setembro: "Setembro",
    outubro: "Outubro",
    novembro: "Novembro",
    dezembro: "Dezembro"
  };

  return (
    <div className="space-y-4">
      <Label>Estimativa de Geração Mensal (kWh)</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(months).map(([key, label]) => (
          <div key={key} className="space-y-2">
            <Label>{label}</Label>
            <Input
              type="number"
              value={formData.estimativaGeracao[key]}
              onChange={(e) => setFormData({
                ...formData,
                estimativaGeracao: {
                  ...formData.estimativaGeracao,
                  [key]: e.target.value
                }
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};