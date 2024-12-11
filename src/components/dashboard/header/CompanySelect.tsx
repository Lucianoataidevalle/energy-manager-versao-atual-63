import { useData } from "@/contexts/DataContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CompanySelectProps {
  selectedCompany: string;
  onCompanyChange: (company: string) => void;
}

export const CompanySelect = ({
  selectedCompany,
  onCompanyChange,
}: CompanySelectProps) => {
  const { companies } = useData();
  
  const sortedCompanies = [...companies].sort((a, b) => 
    a.razaoSocial.localeCompare(b.razaoSocial)
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Empresa</label>
      <Select value={selectedCompany} onValueChange={onCompanyChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma empresa" />
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