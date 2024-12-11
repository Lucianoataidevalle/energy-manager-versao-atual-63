import { useData } from "@/contexts/DataContext";
import SummaryCard from "./SummaryCard";
import { format, parse, subMonths } from "date-fns";

interface AvoidableCostsSectionProps {
  selectedCompany: string;
  selectedUnit: string;
  selectedMonth: string;
}

const AvoidableCostsSection = ({
  selectedCompany,
  selectedUnit,
  selectedMonth,
}: AvoidableCostsSectionProps) => {
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Custos Evitáveis</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Demanda de Ultrapassagem"
          currentValue={currentCosts.demandOverrun}
          totalValue={totalCosts.demandOverrun}
          isCurrency={true}
          averageLabel="Total 12 meses"
          hidePercentage={true}
        />
        <SummaryCard
          title="Demanda Reativa"
          currentValue={currentCosts.reactiveDemand}
          totalValue={totalCosts.reactiveDemand}
          isCurrency={true}
          averageLabel="Total 12 meses"
          hidePercentage={true}
        />
        <SummaryCard
          title="Energia Reativa"
          currentValue={currentCosts.reactiveEnergy}
          totalValue={totalCosts.reactiveEnergy}
          isCurrency={true}
          averageLabel="Total 12 meses"
          hidePercentage={true}
        />
        <SummaryCard
          title="Multas/Juros"
          currentValue={currentCosts.fines}
          totalValue={totalCosts.fines}
          isCurrency={true}
          averageLabel="Total 12 meses"
          hidePercentage={true}
        />
      </div>
    </div>
  );
};

export default AvoidableCostsSection;