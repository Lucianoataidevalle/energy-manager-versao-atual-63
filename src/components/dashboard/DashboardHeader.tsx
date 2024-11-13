import { useData } from "@/contexts/DataContext";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonthSelector } from "../shared/MonthSelector";

interface DashboardHeaderProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
  onCompanyChange: (value: string) => void;
  onUnitChange: (value: string) => void;
  onMonthChange: (value: string) => void;
}

const DashboardHeader = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
  onCompanyChange,
  onUnitChange,
  onMonthChange,
}: DashboardHeaderProps) => {
  const { companies, consumerUnits } = useData();
  const availableUnits = consumerUnits.filter(
    (unit) => unit.empresa === selectedCompany
  );

  useEffect(() => {
    if (!selectedCompany && companies.length > 0) {
      onCompanyChange(companies[0].razaoSocial);
    }
  }, [companies, selectedCompany, onCompanyChange]);

  useEffect(() => {
    if (!selectedUnit && availableUnits.length > 0) {
      onUnitChange(availableUnits[0].nome);
    }
  }, [availableUnits, selectedUnit, onUnitChange]);

  return (
    <div className="fixed top-0 right-0 left-64 bg-background z-50 border-b">
      <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="space-y-2 w-full md:w-[200px]">
            <label className="text-sm font-medium">Empresa</label>
            <Select value={selectedCompany} onValueChange={onCompanyChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a empresa" />
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

          <div className="space-y-2 w-full md:w-[200px]">
            <label className="text-sm font-medium">UC</label>
            <Select value={selectedUnit} onValueChange={onUnitChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a UC" />
              </SelectTrigger>
              <SelectContent>
                {availableUnits.map((unit) => (
                  <SelectItem key={unit.id} value={unit.nome}>
                    {unit.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-[200px]">
            <MonthSelector value={selectedMonth} onChange={onMonthChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;