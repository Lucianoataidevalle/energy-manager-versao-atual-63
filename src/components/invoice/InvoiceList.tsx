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

interface InvoiceListProps {
  selectedCompany: string;
  selectedUnit: string;
}

const mockInvoices = [
  {
    id: 1,
    mes: "Janeiro/2024",
    consumoForaPonta: 3000,
    consumoPonta: 1000,
    demandaMedida: 400,
    demandaUltrapassagem: 0,
    valorFatura: 5000.0,
  },
  {
    id: 2,
    mes: "Fevereiro/2024",
    consumoForaPonta: 2800,
    consumoPonta: 900,
    demandaMedida: 380,
    demandaUltrapassagem: 0,
    valorFatura: 4800.0,
  },
];

const InvoiceList = ({ selectedCompany, selectedUnit }: InvoiceListProps) => {
  const handleEdit = (id: number) => {
    // TODO: Implement edit logic
    console.log("Edit invoice", id);
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete logic
    console.log("Delete invoice", id);
  };

  const exportToCSV = () => {
    const headers = [
      "Mês de Referência",
      "Consumo Fora Ponta (kWh)",
      "Consumo Ponta (kWh)",
      "Demanda Medida (kW)",
      "Demanda Ultrapassagem (kW)",
      "Valor (R$)",
    ];

    const csvData = mockInvoices.map((invoice) => [
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

  const companyName = "Empresa Exemplo 1";
  const unitName = "Matriz";
  const unitNumber = "123456789";

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Histórico de Faturas</CardTitle>
            <p className="text-sm text-muted-foreground">
              {companyName} - {unitName} (UC: {unitNumber})
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
            {mockInvoices.map((invoice) => (
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Editar Fatura</AlertDialogTitle>
                        <AlertDialogDescription>
                          Deseja realmente editar esta fatura?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleEdit(invoice.id)}>
                          Confirmar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

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
                        <AlertDialogAction onClick={() => handleDelete(invoice.id)}>
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