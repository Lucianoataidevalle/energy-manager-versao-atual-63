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
import { toast } from "sonner";

interface InvoiceListProps {
  selectedCompany: string;
  selectedUnit: string;
}

const InvoiceList = ({ selectedCompany, selectedUnit }: InvoiceListProps) => {
  const { invoices, deleteInvoice, setEditingInvoice } = useData();

  const filteredInvoices = invoices
    .filter(
      (invoice) => 
        (!selectedCompany || invoice.empresa === selectedCompany) && 
        (!selectedUnit || invoice.unidade === selectedUnit)
    )
    .sort((a, b) => new Date(b.mes).getTime() - new Date(a.mes).getTime());

  const handleEdit = (invoice: any) => {
    setEditingInvoice(invoice);
    toast.success("Editando fatura...", {
      position: "top-right",
    });
  };

  const handleDelete = (id: number) => {
    deleteInvoice(id);
    toast.success("Fatura excluída com sucesso!", {
      position: "top-right",
    });
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const exportToCSV = () => {
    const headers = [
      "Mês de Referência",
      "Consumo Fora Ponta (kWh)",
      "Consumo Ponta (kWh)",
      "Demanda Fora Ponta (kW)",
      "Demanda Ponta (kW)",
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
      invoice.demandaMedidaForaPonta,
      invoice.demandaMedidaPonta,
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
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Mês de Referência</TableHead>
                  <TableHead className="text-center">Consumo Fora Ponta (kWh)</TableHead>
                  <TableHead className="text-center">Consumo Ponta (kWh)</TableHead>
                  <TableHead className="text-center">Demanda Fora Ponta (kW)</TableHead>
                  <TableHead className="text-center">Demanda Ponta (kW)</TableHead>
                  <TableHead className="text-center">Energia Reativa Fora Ponta (kVAr)</TableHead>
                  <TableHead className="text-center">Energia Reativa Ponta (kVAr)</TableHead>
                  <TableHead className="text-center">Demanda Reativa Fora Ponta (kVAr)</TableHead>
                  <TableHead className="text-center">Demanda Reativa Ponta (kVAr)</TableHead>
                  <TableHead className="text-center">Multas/Juros (R$)</TableHead>
                  <TableHead className="text-center">Valor Fatura (R$)</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="text-center">
                      {invoice.mes}
                    </TableCell>
                    <TableCell className="text-center">{formatNumber(invoice.consumoForaPonta)}</TableCell>
                    <TableCell className="text-center">{formatNumber(invoice.consumoPonta)}</TableCell>
                    <TableCell className="text-center">{formatNumber(invoice.demandaMedidaForaPonta)}</TableCell>
                    <TableCell className="text-center">{formatNumber(invoice.demandaMedidaPonta)}</TableCell>
                    <TableCell className="text-center">{formatNumber(invoice.energiaReativaForaPonta)}</TableCell>
                    <TableCell className="text-center">{formatNumber(invoice.energiaReativaPonta)}</TableCell>
                    <TableCell className="text-center">{formatNumber(invoice.demandaReativaForaPonta)}</TableCell>
                    <TableCell className="text-center">{formatNumber(invoice.demandaReativaPonta)}</TableCell>
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
                    <TableCell className="text-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleEdit(invoice)}
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