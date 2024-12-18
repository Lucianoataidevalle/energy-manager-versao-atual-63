import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormHeaderProps {
  formData: any;
  setFormData: (data: any) => void;
  onCompanyChange: (company: string) => void;
  onUnitChange: (unit: string) => void;
  availableUnits: any[];
}

export const FormHeader = ({
  formData,
  setFormData,
  onCompanyChange,
  onUnitChange,
  availableUnits,
}: FormHeaderProps) => {
  const { companies } = useData();
  const { user, isAdmin } = useAuth();

  const userCompanies = isAdmin 
    ? companies 
    : companies.filter(company => 
        user?.empresas?.includes(company.razaoSocial)
      );

  const sortedCompanies = [...userCompanies].sort((a, b) => 
    a.razaoSocial.localeCompare(b.razaoSocial)
  );

  const sortedUnits = [...availableUnits].sort((a, b) => 
    a.nome.localeCompare(b.nome)
  );

  const handleCompanyChange = (value: string) => {
    setFormData({ ...formData, empresa: value, unidade: "" });
    onCompanyChange(value);
  };

  const handleUnitChange = (value: string) => {
    setFormData({ ...formData, unidade: value });
    onUnitChange(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Empresa</label>
        <Select value={formData.empresa} onValueChange={handleCompanyChange}>
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

      <div className="space-y-2">
        <label className="text-sm font-medium">Unidade Consumidora</label>
        <Select value={formData.unidade} onValueChange={handleUnitChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma unidade" />
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
    </div>
  );
};