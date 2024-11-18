import { useData } from "@/contexts/DataContext";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonthSelector } from "../shared/MonthSelector";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AVAILABLE_CHARTS = [
  { id: "consumption", label: "Consumo (kWh)" },
  { id: "demand", label: "Demanda (kW)" },
  { id: "billing", label: "Custo de Faturas (R$)" },
  { id: "reactiveEnergy", label: "Energia Reativa (kVArh)" },
  { id: "reactiveDemand", label: "Demanda Reativa (kVAr)" },
  { id: "fines", label: "Multas/Juros (R$)" },
];

interface DashboardHeaderProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
  onCompanyChange: (value: string) => void;
  onUnitChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  visibleCharts: string[];
  onVisibleChartsChange: (charts: string[]) => void;
}

const DashboardHeader = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
  onCompanyChange,
  onUnitChange,
  onMonthChange,
  visibleCharts,
  onVisibleChartsChange,
}: DashboardHeaderProps) => {
  const { companies, consumerUnits } = useData();
  const [selectedCharts, setSelectedCharts] = useState<string[]>(visibleCharts);
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

  const handleChartToggle = (chartId: string) => {
    setSelectedCharts((prev) =>
      prev.includes(chartId)
        ? prev.filter((id) => id !== chartId)
        : [...prev, chartId]
    );
  };

  const handleApply = () => {
    onVisibleChartsChange(selectedCharts);
  };

  return (
    <div className="bg-background border-b">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              {/* Menu content */}
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-sm font-medium">Empresa</label>
            <Select value={selectedCompany} onValueChange={onCompanyChange}>
              <SelectTrigger className="h-9">
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

          <div className="space-y-1">
            <label className="text-sm font-medium">UC</label>
            <Select value={selectedUnit} onValueChange={onUnitChange}>
              <SelectTrigger className="h-9">
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

          <MonthSelector value={selectedMonth} onChange={onMonthChange} />
        </div>

        <div className="border-t mt-4 pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {AVAILABLE_CHARTS.map((chart) => (
              <div key={chart.id} className="flex items-center space-x-2">
                <Checkbox
                  id={chart.id}
                  checked={selectedCharts.includes(chart.id)}
                  onCheckedChange={() => handleChartToggle(chart.id)}
                />
                <label
                  htmlFor={chart.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {chart.label}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button onClick={handleApply} className="w-full md:w-auto">
              Aplicar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;