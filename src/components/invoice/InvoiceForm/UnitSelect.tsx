import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useData } from "@/contexts/DataContext";

interface UnitSelectProps {
  selectedCompany: string;
  value: string;
  onChange: (value: string) => void;
}

export const UnitSelect = ({ selectedCompany, value, onChange }: UnitSelectProps) => {
  const { consumerUnits } = useData();
  const availableUnits = consumerUnits.filter(
    (unit) => unit.empresa === selectedCompany
  );

  return (
    <div className="space-y-2">
      <label>Unidade Consumidora</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione a UC" />
        </SelectTrigger>
        <SelectContent>
          {availableUnits.map((unit) => (
            <SelectItem key={unit.id} value={unit.nome}>
              {unit.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};