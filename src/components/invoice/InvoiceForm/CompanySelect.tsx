import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useData } from "@/contexts/DataContext";

interface CompanySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const CompanySelect = ({ value, onChange }: CompanySelectProps) => {
  const { companies } = useData();
  
  // Sort companies alphabetically
  const sortedCompanies = [...companies].sort((a, b) => 
    a.razaoSocial.localeCompare(b.razaoSocial)
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Empresa</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione a empresa" />
        </SelectTrigger>
        <SelectContent>
          {sortedCompanies.map((company) => (
            <SelectItem key={company.id} value={company.razaoSocial}>
              {company.razaoSocial}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};