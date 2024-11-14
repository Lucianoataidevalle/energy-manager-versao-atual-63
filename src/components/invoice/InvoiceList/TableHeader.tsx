import {
  TableHead,
  TableHeader as UITableHeader,
  TableRow,
} from "@/components/ui/table";

interface InvoiceTableHeaderProps {
  isGroupB: boolean;
}

export const InvoiceTableHeader = ({ isGroupB }: InvoiceTableHeaderProps) => {
  return (
    <UITableHeader>
      <TableRow>
        <TableHead className="text-center">Mês de Referência</TableHead>
        <TableHead className="text-center">Consumo Fora Ponta (kWh)</TableHead>
        {!isGroupB && (
          <>
            <TableHead className="text-center">Consumo Ponta (kWh)</TableHead>
            <TableHead className="text-center">Consumo Total (kWh)</TableHead>
            <TableHead className="text-center">Demanda Fora Ponta (kW)</TableHead>
            <TableHead className="text-center">Demanda Ponta (kW)</TableHead>
            <TableHead className="text-center">Demanda Ultrapassagem Fora Ponta (kW)</TableHead>
            <TableHead className="text-center">Demanda Ultrapassagem Ponta (kW)</TableHead>
            <TableHead className="text-center">Energia Reativa Fora Ponta (kVAr)</TableHead>
            <TableHead className="text-center">Energia Reativa Ponta (kVAr)</TableHead>
            <TableHead className="text-center">Demanda Reativa Fora Ponta (kVAr)</TableHead>
            <TableHead className="text-center">Demanda Reativa Ponta (kVAr)</TableHead>
          </>
        )}
        <TableHead className="text-center">Multas/Juros (R$)</TableHead>
        <TableHead className="text-center">Valor Fatura (R$)</TableHead>
        <TableHead className="text-center">Ações</TableHead>
      </TableRow>
    </UITableHeader>
  );
};