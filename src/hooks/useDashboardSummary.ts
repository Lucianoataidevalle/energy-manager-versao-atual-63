
import { useData } from "@/contexts/DataContext";
import { format, parse, subMonths } from "date-fns";

export const useDashboardSummary = (
  selectedCompany: string,
  selectedUnit: string,
  selectedMonth: string
) => {
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

  const calculateMainMetrics = () => {
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

  const currentMetrics = currentMonthInvoice ? {
    consumption: currentMonthInvoice.consumoPonta + currentMonthInvoice.consumoForaPonta,
    demand: currentMonthInvoice.demandaMedidaForaPonta + currentMonthInvoice.demandaMedidaPonta,
    total: currentMonthInvoice.valorFatura,
    generation: currentMonthInvoice.energiaInjetadaForaPonta + currentMonthInvoice.energiaInjetadaPonta,
  } : { consumption: 0, demand: 0, total: 0, generation: 0 };

  const averageMetrics = calculateMainMetrics();

  return {
    currentMetrics,
    averageMetrics
  };
};
