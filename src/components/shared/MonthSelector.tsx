import { format, subMonths, subYears } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MonthSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MonthSelector = ({ value, onChange }: MonthSelectorProps) => {
  // Gera array com os últimos 36 meses (3 anos)
  const getLastThreeYearsMonths = () => {
    const months = [];
    const currentDate = new Date();
    const startDate = subYears(currentDate, 3);

    for (let date = currentDate; date >= startDate; date = subMonths(date, 1)) {
      months.push({
        value: format(date, "yyyy-MM"),
        label: format(date, "MMMM/yyyy", { locale: ptBR }),
      });
    }

    return months;
  };

  const months = getLastThreeYearsMonths();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Mês de Referência</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o mês" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};