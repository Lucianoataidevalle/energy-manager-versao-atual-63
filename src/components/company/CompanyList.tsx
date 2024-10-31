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

const mockCompanies = [
  {
    id: 1,
    razaoSocial: "Empresa Exemplo 1",
    cnpj: "12.345.678/0001-90",
    endereco: "Rua Exemplo, 123",
    unidades: ["UC-001", "UC-002"],
  },
  {
    id: 2,
    razaoSocial: "Empresa Exemplo 2",
    cnpj: "98.765.432/0001-10",
    endereco: "Avenida Teste, 456",
    unidades: ["UC-003"],
  },
];

const CompanyList = () => {
  const handleEdit = (id: number) => {
    // TODO: Implement edit logic
    console.log("Edit company", id);
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete logic
    console.log("Delete company", id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Empresas Cadastradas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Razão Social</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Unidades Consumidoras</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.razaoSocial}</TableCell>
                <TableCell>{company.cnpj}</TableCell>
                <TableCell>{company.endereco}</TableCell>
                <TableCell>{company.unidades.join(", ")}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(company.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(company.id)}
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

export default CompanyList;