import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useData } from "@/contexts/DataContext";
import { Checkbox } from "@/components/ui/checkbox";

interface CompanySelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const CompanySelect = ({ value, onChange }: CompanySelectProps) => {
  const { companies } = useData();

  const handleCompanyToggle = (companyName: string) => {
    const newValue = value.includes(companyName)
      ? value.filter((name) => name !== companyName)
      : [...value, companyName];
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <label>Empresas</label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Selecione as empresas" />
        </SelectTrigger>
        <SelectContent>
          <div className="space-y-2 p-2">
            {companies.map((company) => (
              <div key={company.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`company-${company.id}`}
                  checked={value.includes(company.razaoSocial)}
                  onCheckedChange={() => handleCompanyToggle(company.razaoSocial)}
                />
                <label
                  htmlFor={`company-${company.id}`}
                  className="text-sm cursor-pointer"
                >
                  {company.razaoSocial}
                </label>
              </div>
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};