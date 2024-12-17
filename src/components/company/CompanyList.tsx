import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";

const CompanyList = () => {
  const { companies, consumerUnits, deleteCompany, setEditingCompany } = useData();
  const { isAdmin, user } = useAuth();
  const [filters, setFilters] = useState({
    razaoSocial: "",
    cnpj: "",
    endereco: "",
  });

  // Filter companies based on user permissions
  const userCompanies = isAdmin 
    ? companies 
    : companies.filter(company => user?.empresas?.includes(company.razaoSocial));

  // Apply filters
  const filteredCompanies = userCompanies.filter(company => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const companyValue = company[key as keyof typeof company]?.toString().toLowerCase();
      return companyValue?.includes(value.toLowerCase());
    });
  });

  // Get UC count for each company
  const getUCCount = (companyName: string) => {
    return consumerUnits.filter(unit => unit.empresa === companyName).length;
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
              <TableHead>
                <Input
                  placeholder="Filtrar razão social"
                  value={filters.razaoSocial}
                  onChange={(e) => setFilters(prev => ({ ...prev, razaoSocial: e.target.value }))}
                  className="max-w-sm"
                />
              </TableHead>
              <TableHead>
                <Input
                  placeholder="Filtrar CNPJ"
                  value={filters.cnpj}
                  onChange={(e) => setFilters(prev => ({ ...prev, cnpj: e.target.value }))}
                  className="max-w-sm"
                />
              </TableHead>
              <TableHead>
                <Input
                  placeholder="Filtrar endereço"
                  value={filters.endereco}
                  onChange={(e) => setFilters(prev => ({ ...prev, endereco: e.target.value }))}
                  className="max-w-sm"
                />
              </TableHead>
              <TableHead className="text-center">Quantidade UC</TableHead>
              {isAdmin && <TableHead className="text-center">Ações</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="text-center">{company.razaoSocial}</TableCell>
                <TableCell className="text-center">{formatCNPJ(company.cnpj)}</TableCell>
                <TableCell className="text-center">{company.endereco}</TableCell>
                <TableCell className="text-center">{getUCCount(company.razaoSocial)}</TableCell>
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