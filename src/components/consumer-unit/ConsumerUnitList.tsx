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
    // TODO: Implement edit logic with API integration
    toast.success("Unidade Consumidora editada com sucesso!");
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete logic with API integration
    toast.success("Unidade Consumidora excluída com sucesso!");
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Editar Unidade Consumidora</AlertDialogTitle>
                        <AlertDialogDescription>
                          Deseja realmente editar esta unidade consumidora?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleEdit(unit.id)}>
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
                        <AlertDialogTitle>Excluir Unidade Consumidora</AlertDialogTitle>
                        <AlertDialogDescription>
                          Deseja realmente excluir esta unidade consumidora? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(unit.id)}>
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

export default ConsumerUnitList;