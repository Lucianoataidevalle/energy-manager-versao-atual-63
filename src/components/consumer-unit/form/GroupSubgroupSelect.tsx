import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface GroupSubgroupSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const GroupSubgroupSelect = ({ value, onChange }: GroupSubgroupSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="grupoSubgrupo">Grupo/Subgrupo</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o grupo/subgrupo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="B">B</SelectItem>
          <SelectItem value="A3a">A3a</SelectItem>
          <SelectItem value="A4">A4</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};