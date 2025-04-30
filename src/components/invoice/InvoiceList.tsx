import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/DataContext";
import { Invoice } from "@/contexts/types";
import { toast } from "sonner";
import { InvoiceTableHeader } from "./InvoiceList/TableHeader";
import { TableActions } from "./InvoiceList/TableActions";

interface InvoiceListProps {
  selectedCompany: string;
  selectedUnit: string;
  onEditInvoice?: () => void;
}

const InvoiceList = ({ selectedCompany, selectedUnit, onEditInvoice }: InvoiceListProps) => {
  const { invoices, consumerUnits, deleteInvoice, setEditingInvoice } = useData();

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    if (onEditInvoice) {
      onEditInvoice();
    }
  };

  const handleDelete = (id: string) => {
    deleteInvoice(id);
  };

  const selectedConsumerUnit = consumerUnits.find(
    unit => unit.empresa === selectedCompany && unit.nome === selectedUnit
  );

  const isGroupB = selectedConsumerUnit?.grupoSubgrupo === "B";

  const calculateDemandaUltrapassagem = (medida: number, contratada: number) => {
    const limite = contratada * 1.05;
    return medida > limite ? medida - contratada : 0;
  };

  const filteredInvoices = invoices
    .filter(
      (invoice) => 
        (!selectedCompany || invoice.empresa === selectedCompany) && 
        (!selectedUnit || invoice.unidade === selectedUnit)
    )
    .sort((a, b) => new Date(b.mes).getTime() - new Date(a.mes).getTime())
    .map(invoice => {
      const unit = consumerUnits.find(
        unit => unit.empresa === invoice.empresa && unit.nome === invoice.unidade
      );

      if (!unit) return invoice;

      const demandaContratada = Number(unit.demandaContratada);
      const demandaContratadaPonta = Number(unit.demandaContratadaPonta);
      const demandaContratadaForaPonta = Number(unit.demandaContratadaForaPonta);

      return {
        ...invoice,
        demandaUltrapassagemForaPonta: unit.modalidadeTarifaria === "Verde" 
          ? calculateDemandaUltrapassagem(invoice.demandaMedidaForaPonta, demandaContratada)
          : calculateDemandaUltrapassagem(invoice.demandaMedidaForaPonta, demandaContratadaForaPonta),
        demandaUltrapassagemPonta: unit.modalidadeTarifaria === "Azul"
          ? calculateDemandaUltrapassagem(invoice.demandaMedidaPonta, demandaContratadaPonta)
          : 0
      };
    });

  const formatNumber = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const calculateTotalConsumption = (foraPonta: number, ponta: number) => {
    return foraPonta + ponta;
  };

  const exportToCSV = () => {
    const headers = [
      "Mês de Referência",
      "Consumo Fora Ponta (kWh)",
      "Consumo Ponta (kWh)",
      "Consumo Total (kWh)",
      "Demanda Fora Ponta (kW)",
      "Demanda Ponta (kW)",
      "Demanda de Ultrapassagem Fora Ponta (kW)",
      "Demanda de Ultrapassagem Ponta (kW)",
      "Energia Reativa Fora Ponta (kVAr)",
      "Energia Reativa Ponta (kVAr)",
      "Demanda Reativa Fora Ponta (kVAr)",
      "Demanda Reativa Ponta (kVAr)",
      "Multas/Juros (R$)",
      "Valor (R$)",
    ];

    const csvData = filteredInvoices.map((invoice) => [
      invoice.mes,
      invoice.consumoForaPonta,
      invoice.consumoPonta,
      calculateTotalConsumption(invoice.consumoForaPonta, invoice.consumoPonta),
      invoice.demandaMedidaForaPonta,
      invoice.demandaMedidaPonta,
      invoice.demandaUltrapassagemForaPonta,
      invoice.demandaUltrapassagemPonta,
      invoice.energiaReativaForaPonta,
      invoice.energiaReativaPonta,
      invoice.demandaReativaForaPonta,
      invoice.demandaReativaPonta,
      invoice.multasJuros,
      invoice.valorFatura,
    ]);

    const csvContent =
      [headers, ...csvData]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "historico_faturas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Histórico de Faturas</CardTitle>
            <p className="text-lg text-muted-foreground mt-1">
              {selectedCompany && selectedUnit ? `${selectedCompany} - ${selectedUnit}` : "Selecione uma empresa e unidade consumidora"}
            </p>
          </div>
          {filteredInvoices.length > 0 && (
            <Button onClick={exportToCSV} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {selectedCompany && selectedUnit ? (
          <div className="overflow-x-auto">
            <Table>
              <InvoiceTableHeader isGroupB={isGroupB} />
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="text-center">{invoice.mes}</TableCell>
                    <TableCell className="text-center">{formatNumber(invoice.consumoForaPonta)}</TableCell>
                    {!isGroupB && (
                      <>
                        <TableCell className="text-center">{formatNumber(invoice.consumoPonta)}</TableCell>
                        <TableCell className="text-center">
                          {formatNumber(calculateTotalConsumption(invoice.consumoForaPonta, invoice.consumoPonta))}
                        </TableCell>
                        <TableCell className="text-center">{formatNumber(invoice.demandaMedidaForaPonta)}</TableCell>
                        <TableCell className="text-center">{formatNumber(invoice.demandaMedidaPonta)}</TableCell>
                        <TableCell className="text-center">{formatNumber(invoice.demandaUltrapassagemForaPonta)}</TableCell>
                        <TableCell className="text-center">{formatNumber(invoice.demandaUltrapassagemPonta)}</TableCell>
                        <TableCell className="text-center">{formatNumber(invoice.energiaReativaForaPonta)}</TableCell>
                        <TableCell className="text-center">{formatNumber(invoice.energiaReativaPonta)}</TableCell>
                        <TableCell className="text-center">{formatNumber(invoice.demandaReativaForaPonta)}</TableCell>
                        <TableCell className="text-center">{formatNumber(invoice.demandaReativaPonta)}</TableCell>
                      </>
                    )}
                    <TableCell className="text-center">
                      {invoice.multasJuros.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      {invoice.valorFatura.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      <TableActions
                        onEdit={() => handleEdit(invoice)}
                        onDelete={() => handleDelete(invoice.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Selecione uma empresa e unidade consumidora para visualizar o histórico de faturas
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvoiceList;
