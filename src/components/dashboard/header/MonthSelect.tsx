import { format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MonthSelectProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export const MonthSelect = ({
  selectedMonth,
  onMonthChange,
}: MonthSelectProps) => {
  const getLast12Months = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = subMonths(currentDate, i);
      const value = format(date, "yyyy-MM");
      const label = format(date, "MMMM 'de' yyyy", { locale: ptBR });
      months.push({ value, label });
    }
    
    return months;
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Mês de Referência</label>
      <Select value={selectedMonth} onValueChange={onMonthChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um mês" />
        </SelectTrigger>
        <SelectContent>
          {getLast12Months().map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};