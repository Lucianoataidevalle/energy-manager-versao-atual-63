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
import { useData } from "@/contexts/DataContext";
import { formatCNPJ } from "@/utils/formatters";
import { useAuth } from "@/contexts/AuthContext";

const CompanyList = () => {
  const { companies, deleteCompany, setEditingCompany } = useData();
  const { isAdmin } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Empresas Cadastradas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Razão Social</TableHead>
              <TableHead className="text-center">CNPJ</TableHead>
              <TableHead className="text-center">Endereço</TableHead>
              <TableHead className="text-center">Quantidade UC</TableHead>
              {isAdmin && <TableHead className="text-center">Ações</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="text-center">{company.razaoSocial}</TableCell>
                <TableCell className="text-center">{formatCNPJ(company.cnpj)}</TableCell>
                <TableCell className="text-center">{company.endereco}</TableCell>
                <TableCell className="text-center">{company.unidades.length}</TableCell>
                {isAdmin && (
                  <TableCell className="text-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setEditingCompany(company)}
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
                          <AlertDialogTitle>Excluir Empresa</AlertDialogTitle>
                          <AlertDialogDescription>
                            Deseja realmente excluir esta empresa? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteCompany(company.id)}>
                            Confirmar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CompanyList;