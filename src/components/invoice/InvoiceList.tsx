import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const companyName = "Empresa Exemplo 1";
  const unitName = "Matriz";
  const unitNumber = "123456789";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Faturas</CardTitle>
        <p className="text-sm text-muted-foreground">
          {companyName} - {unitName} (UC: {unitNumber})
        </p>
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
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(invoice.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(invoice.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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