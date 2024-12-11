import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChartVisibilitySelectProps {
  visibleCharts: string[];
  onVisibleChartsChange: (charts: string[]) => void;
}

export const ChartVisibilitySelect = ({
  visibleCharts,
  onVisibleChartsChange,
}: ChartVisibilitySelectProps) => {
  const chartOptions = [
    { id: "consumption", label: "Consumo" },
    { id: "demand", label: "Demanda" },
    { id: "billing", label: "Faturamento" },
    { id: "reactiveEnergy", label: "Energia Reativa" },
    { id: "reactiveDemand", label: "Demanda Reativa" },
    { id: "fines", label: "Multas" },
  ];

  const handleChange = (value: string) => {
    const selectedCharts = value.split(",");
    onVisibleChartsChange(selectedCharts);
  };

  return (
    <Select
      value={visibleCharts.join(",")}
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Selecione os gráficos" />
      </SelectTrigger>
      <SelectContent>
        {chartOptions.map((chart) => (
          <SelectItem key={chart.id} value={chart.id}>
            {chart.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};