import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
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

const CompanyList = () => {
  const { companies, deleteCompany, setEditingCompany } = useData();
  const { isAdmin } = useAuth();

  // Sort companies alphabetically by razaoSocial
  const sortedCompanies = [...companies].sort((a, b) => 
    a.razaoSocial.localeCompare(b.razaoSocial)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Empresas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Razão Social</TableHead>
              {isAdmin && <TableHead>Ações</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.razaoSocial}</TableCell>
                {isAdmin && (
                  <TableCell className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setEditingCompany(company)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteCompany(company.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
