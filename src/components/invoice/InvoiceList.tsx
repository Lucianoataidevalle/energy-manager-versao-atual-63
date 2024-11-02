import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useData } from "@/contexts/DataContext";

interface InvoiceListProps {
  selectedCompany: string;
  selectedUnit: string;
}

const InvoiceList = ({ selectedCompany, selectedUnit }: InvoiceListProps) => {
  const { invoices, deleteInvoice, setEditingInvoice } = useData();

  const exportToCSV = () => {
    const headers = [
      "Mês de Referência",
      "Consumo Fora Ponta (kWh)",
      "Consumo Ponta (kWh)",
      "Demanda Medida (kW)",
      "Demanda Ultrapassagem (kW)",
      "Valor (R$)",
    ];

    const csvData = invoices.map((invoice) => [
      invoice.mes,
      invoice.consumoForaPonta,
      invoice.consumoPonta,
      invoice.demandaMedida,
      invoice.demandaUltrapassagem,
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
              {selectedCompany} - {selectedUnit}
            </p>
          </div>
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mês de Referência</TableHead>
              <TableHead>Consumo Fora Ponta (kWh)</TableHead>
              <TableHead>Consumo Ponta (kWh)</TableHead>
              <TableHead>Demanda Medida (kW)</TableHead>
              <TableHead>Demanda Ultrapassagem (kW)</TableHead>
              <TableHead>Valor (R$)</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.mes}</TableCell>
                <TableCell>{invoice.consumoForaPonta}</TableCell>
                <TableCell>{invoice.consumoPonta}</TableCell>
                <TableCell>{invoice.demandaMedida}</TableCell>
                <TableCell>{invoice.demandaUltrapassagem}</TableCell>
                <TableCell>
                  {invoice.valorFatura.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setEditingInvoice(invoice)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Fatura</AlertDialogTitle>
                        <AlertDialogDescription>
                          Deseja realmente excluir esta fatura? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteInvoice(invoice.id)}>
                          Confirmar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InvoiceList;
