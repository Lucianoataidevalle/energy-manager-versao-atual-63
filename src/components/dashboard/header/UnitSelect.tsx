import { useData } from "@/contexts/DataContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UnitSelectProps {
  selectedCompany: string;
  selectedUnit: string;
  onUnitChange: (unit: string) => void;
}

export const UnitSelect = ({
  selectedCompany,
  selectedUnit,
  onUnitChange,
}: UnitSelectProps) => {
  const { consumerUnits } = useData();
  
  const filteredUnits = consumerUnits
    .filter((unit) => unit.empresa === selectedCompany)
    .sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Unidade Consumidora</label>
      <Select value={selectedUnit} onValueChange={onUnitChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma unidade" />
        </SelectTrigger>
        <SelectContent>
          {filteredUnits.map((unit) => (
            <SelectItem key={unit.id} value={unit.nome}>
              {unit.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};