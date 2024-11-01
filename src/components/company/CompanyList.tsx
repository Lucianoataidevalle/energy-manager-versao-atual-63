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
import { toast } from "sonner";

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
    // TODO: Implement edit logic with API integration
    toast.success("Empresa editada com sucesso!");
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete logic with API integration
    toast.success("Empresa excluída com sucesso!");
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Editar Empresa</AlertDialogTitle>
                        <AlertDialogDescription>
                          Deseja realmente editar esta empresa?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleEdit(company.id)}>
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
                        <AlertDialogTitle>Excluir Empresa</AlertDialogTitle>
                        <AlertDialogDescription>
                          Deseja realmente excluir esta empresa? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(company.id)}>
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

export default CompanyList;