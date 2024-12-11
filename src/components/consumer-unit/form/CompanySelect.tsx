import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useData } from "@/contexts/DataContext";

interface CompanySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const CompanySelect = ({ value, onChange }: CompanySelectProps) => {
  const { companies } = useData();

  return (
    <div className="space-y-2">
      <Label htmlFor="empresa">Empresa</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma empresa" />
        </SelectTrigger>
        <SelectContent>
          {companies.map((company) => (
            <SelectItem key={company.id} value={company.razaoSocial}>
              {company.razaoSocial}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};