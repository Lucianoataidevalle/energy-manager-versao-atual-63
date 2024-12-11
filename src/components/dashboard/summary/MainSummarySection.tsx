import { useData } from "@/contexts/DataContext";
import SummaryCard from "./SummaryCard";
import { format, parse, subMonths } from "date-fns";

interface MainSummarySectionProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const MainSummarySection = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
}: MainSummarySectionProps) => {
  const { invoices } = useData();

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.empresa === selectedCompany && invoice.unidade === selectedUnit
  );

  const getLast12MonthsData = () => {
    const selectedDate = parse(selectedMonth, 'yyyy-MM', new Date());
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = subMonths(selectedDate, i);
      return format(date, 'yyyy-MM');
    });

    return months.map(month => 
      filteredInvoices.find(invoice => invoice.mes === month)
    ).filter(Boolean);
  };

  const last12Months = getLast12MonthsData();
  const currentMonthInvoice = filteredInvoices.find(
    (invoice) => invoice.mes === selectedMonth
  );

  const calculateAverages = () => {
    if (last12Months.length === 0) return { 
      consumption: 0, 
      demand: 0, 
      total: 0,
      generation: 0 
    };

    const sum = last12Months.reduce(
      (acc, invoice) => ({
        consumption: acc.consumption + (invoice.consumoPonta + invoice.consumoForaPonta),
        demand: acc.demand + (invoice.demandaMedidaForaPonta + invoice.demandaMedidaPonta),
        total: acc.total + invoice.valorFatura,
        generation: acc.generation + (invoice.energiaInjetadaForaPonta + invoice.energiaInjetadaPonta)
      }),
      { consumption: 0, demand: 0, total: 0, generation: 0 }
    );

    const count = last12Months.length;
    return {
      consumption: sum.consumption / count,
      demand: sum.demand / count,
      total: sum.total / count,
      generation: sum.generation / count
    };
  };

  const averages = calculateAverages();
  const currentConsumption = currentMonthInvoice ? 
    currentMonthInvoice.consumoPonta + currentMonthInvoice.consumoForaPonta : 0;
  const currentDemand = currentMonthInvoice ? 
    currentMonthInvoice.demandaMedidaForaPonta + currentMonthInvoice.demandaMedidaPonta : 0;
  const currentTotal = currentMonthInvoice?.valorFatura || 0;
  const currentGeneration = currentMonthInvoice ?
    currentMonthInvoice.energiaInjetadaForaPonta + currentMonthInvoice.energiaInjetadaPonta : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        title="Consumo"
        currentValue={currentConsumption}
        averageValue={averages.consumption}
        unit="kWh"
      />
      <SummaryCard
        title="Demanda"
        currentValue={currentDemand}
        averageValue={averages.demand}
        unit="kW"
      />
      <SummaryCard
        title="Geração de Energia"
        currentValue={currentGeneration}
        averageValue={averages.generation}
        unit="kWh"
      />
      <SummaryCard
        title="Custo de Faturas"
        currentValue={currentTotal}
        averageValue={averages.total}
        isCurrency={true}
      />
    </div>
  );
};

export default MainSummarySection;