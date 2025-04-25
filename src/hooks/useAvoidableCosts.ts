
import { useData } from "@/contexts/DataContext";
import { format, parse, subMonths } from "date-fns";

export const useAvoidableCosts = (
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

  const calculateCosts = (invoice: typeof currentMonthInvoice) => {
    if (!invoice) return { 
      reactiveDemand: 0, 
      reactiveEnergy: 0, 
      fines: 0,
      demandOverrun: 0 
    };
    
    return {
      reactiveDemand: (Number(invoice.custoDemandaReativaForaPonta) || 0) + 
                      (Number(invoice.custoDemandaReativaPonta) || 0),
      reactiveEnergy: (Number(invoice.custoEnergiaReativaForaPonta) || 0) + 
                     (Number(invoice.custoEnergiaReativaPonta) || 0),
      fines: Number(invoice.multasJuros) || 0,
      demandOverrun: (Number(invoice.demandaUltrapassagemForaPonta) || 0) +
                    (Number(invoice.demandaUltrapassagemPonta) || 0)
    };
  };

  const calculateTotalCosts = () => {
    return last12Months.reduce(
      (acc, invoice) => {
        const costs = calculateCosts(invoice);
        return {
          reactiveDemand: acc.reactiveDemand + costs.reactiveDemand,
          reactiveEnergy: acc.reactiveEnergy + costs.reactiveEnergy,
          fines: acc.fines + costs.fines,
          demandOverrun: acc.demandOverrun + costs.demandOverrun
        };
      },
      { reactiveDemand: 0, reactiveEnergy: 0, fines: 0, demandOverrun: 0 }
    );
  };

  const currentCosts = calculateCosts(currentMonthInvoice);
  const totalCosts = calculateTotalCosts();

  return {
    currentCosts,
    totalCosts
  };
};
