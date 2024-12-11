import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CompanyUnitSelectProps {
  formData: {
    empresa: string;
    unidadeConsumidora: string;
  };
  setFormData: (data: any) => void;
}

export const CompanyUnitSelect = ({ formData, setFormData }: CompanyUnitSelectProps) => {
  const { companies, consumerUnits } = useData();
  const { user, isAdmin } = useAuth();

  const userCompanies = isAdmin 
    ? companies 
    : companies.filter(company => 
        user?.empresas?.includes(company.razaoSocial)
      );

  const availableUnits = consumerUnits.filter(
    unit => unit.empresa === formData.empresa && 
    unit.possuiGeracao && 
    (isAdmin || user?.unidadesConsumidoras?.includes(unit.numero))
  );

  return (
    <>
      <div className="space-y-2">
        <Label>Empresa</Label>
        <Select
          value={formData.empresa}
          onValueChange={(value) => setFormData({ ...formData, empresa: value, unidadeConsumidora: "" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a empresa" />
          </SelectTrigger>
          <SelectContent>
            {userCompanies
              .sort((a, b) => a.razaoSocial.localeCompare(b.razaoSocial))
              .map((company) => (
                <SelectItem key={company.id} value={company.razaoSocial}>
                  {company.razaoSocial}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Unidade Consumidora</Label>
        <Select
          value={formData.unidadeConsumidora}
          onValueChange={(value) => setFormData({ ...formData, unidadeConsumidora: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a unidade consumidora" />
          </SelectTrigger>
          <SelectContent>
            {availableUnits
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map((unit) => (
                <SelectItem key={unit.id} value={unit.nome}>
                  {unit.nome}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};