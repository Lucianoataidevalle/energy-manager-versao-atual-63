import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConsumerUnit } from "@/contexts/types";

interface UnitSelectProps {
  units: ConsumerUnit[];
  value: string;
  onChange: (value: string) => void;
}

export const UnitSelect = ({ units, value, onChange }: UnitSelectProps) => {
  // Sort units alphabetically
  const sortedUnits = [...units].sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Unidade Consumidora</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione a unidade" />
        </SelectTrigger>
        <SelectContent>
          {sortedUnits.map((unit) => (
            <SelectItem key={unit.id} value={unit.nome}>
              {unit.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};