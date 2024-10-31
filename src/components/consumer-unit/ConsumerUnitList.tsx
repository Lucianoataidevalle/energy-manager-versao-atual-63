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

const mockUnits = [
  {
    id: 1,
    empresa: "Empresa Exemplo 1",
    nome: "Matriz",
    numero: "123456789",
    endereco: "Rua Principal, 100",
    distribuidora: "Energia SA",
  },
  {
    id: 2,
    empresa: "Empresa Exemplo 1",
    nome: "Filial 1",
    numero: "987654321",
    endereco: "Avenida Secundária, 200",
    distribuidora: "Energia SA",
  },
];

const ConsumerUnitList = () => {
  const handleEdit = (id: number) => {
    // TODO: Implement edit logic
    console.log("Edit unit", id);
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete logic
    console.log("Delete unit", id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>UC Cadastradas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Número UC</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Distribuidora</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUnits.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell>{unit.empresa}</TableCell>
                <TableCell>{unit.nome}</TableCell>
                <TableCell>{unit.numero}</TableCell>
                <TableCell>{unit.endereco}</TableCell>
                <TableCell>{unit.distribuidora}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(unit.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(unit.id)}
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

export default ConsumerUnitList;