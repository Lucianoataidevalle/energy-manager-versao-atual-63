import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";

interface MultipleChartSelectProps {
  visibleCharts: string[];
  onVisibleChartsChange: (charts: string[]) => void;
}

export const MultipleChartSelect = ({
  visibleCharts,
  onVisibleChartsChange,
}: MultipleChartSelectProps) => {
  const [open, setOpen] = useState(false);

  const chartOptions = useMemo(() => [
    { id: "consumption", label: "Consumo" },
    { id: "demand", label: "Demanda" },
    { id: "billing", label: "Faturamento" },
    { id: "reactiveEnergy", label: "Energia Reativa" },
    { id: "reactiveDemand", label: "Demanda Reativa" },
    { id: "fines", label: "Multas" },
  ], []);

  const toggleChart = (chartId: string) => {
    if (visibleCharts.includes(chartId)) {
      onVisibleChartsChange(visibleCharts.filter((id) => id !== chartId));
    } else {
      onVisibleChartsChange([...visibleCharts, chartId]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {`${visibleCharts.length} gráfico(s) selecionado(s)`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar gráfico..." />
          <CommandList>
            <CommandEmpty>Nenhum gráfico encontrado.</CommandEmpty>
            <CommandGroup>
              {chartOptions.map((chart) => (
                <CommandItem
                  key={chart.id}
                  value={chart.id}
                  onSelect={() => toggleChart(chart.id)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      visibleCharts.includes(chart.id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {chart.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};