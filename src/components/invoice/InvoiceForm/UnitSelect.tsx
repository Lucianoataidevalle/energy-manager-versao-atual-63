import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UnitSelectProps } from "./types";

export const UnitSelect = ({ units, value, onChange }: UnitSelectProps) => {
  return (
    <div className="space-y-2">
      <label>Unidade Consumidora</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione a UC" />
        </SelectTrigger>
        <SelectContent>
          {units.map((unit) => (
            <SelectItem key={unit.id} value={unit.nome}>
              {unit.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};