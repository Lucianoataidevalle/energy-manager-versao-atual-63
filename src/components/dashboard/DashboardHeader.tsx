import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        <Select value={selectedCompany} onValueChange={onCompanyChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione a empresa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Empresa Exemplo 1</SelectItem>
            <SelectItem value="2">Empresa Exemplo 2</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedUnit} onValueChange={onUnitChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione a UC" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Matriz</SelectItem>
            <SelectItem value="2">Filial 1</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedMonth} onValueChange={onMonthChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione o mês" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Janeiro/2024</SelectItem>
            <SelectItem value="2">Fevereiro/2024</SelectItem>
            <SelectItem value="3">Março/2024</SelectItem>
            <SelectItem value="4">Abril/2024</SelectItem>
            <SelectItem value="5">Maio/2024</SelectItem>
            <SelectItem value="6">Junho/2024</SelectItem>
            <SelectItem value="7">Julho/2024</SelectItem>
            <SelectItem value="8">Agosto/2024</SelectItem>
            <SelectItem value="9">Setembro/2024</SelectItem>
            <SelectItem value="10">Outubro/2024</SelectItem>
            <SelectItem value="11">Novembro/2024</SelectItem>
            <SelectItem value="12">Dezembro/2024</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DashboardHeader;