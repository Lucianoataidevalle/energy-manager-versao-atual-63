import { CompanySelect } from "./CompanySelect";
import { UnitSelect } from "./UnitSelect";
import { MonthSelector } from "@/components/shared/MonthSelector";
import { ConsumerUnit } from "./types";

interface FormHeaderProps {
  formData: any;
  setFormData: (data: any) => void;
  onCompanyChange: (company: string) => void;
  onUnitChange: (unit: string) => void;
  availableUnits: ConsumerUnit[];
}

export const FormHeader = ({
  formData,
  setFormData,
  onCompanyChange,
  onUnitChange,
  availableUnits,
}: FormHeaderProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CompanySelect
        value={formData.empresa}
        onChange={(value) => {
          setFormData({ ...formData, empresa: value, unidade: "" });
          onCompanyChange(value);
        }}
      />
      <UnitSelect
        units={availableUnits}
        value={formData.unidade}
        onChange={(value) => {
          setFormData({ ...formData, unidade: value });
          onUnitChange(value);
        }}
      />
      <MonthSelector
        value={formData.mes}
        onChange={(value) => setFormData({ ...formData, mes: value })}
      />
    </div>
  );
};