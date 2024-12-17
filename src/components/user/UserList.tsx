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
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";

const UserList = () => {
  const { users, deleteUser, setEditingUser, companies, consumerUnits } = useData();
  const { isAdmin } = useAuth();

  const renderAssociations = (empresas: string[], unidades: string[]) => {
    const associations: string[] = [];
    
    // Group consumer units by company
    empresas.forEach(empresa => {
      associations.push(empresa);
      
      // Find all consumer units that belong to this company
      const companyUnits = consumerUnits
        .filter(unit => unit.empresa === empresa && unidades.includes(unit.numero))
        .sort((a, b) => a.nome.localeCompare(b.nome));
      
      // Add the company's consumer units with indentation
      companyUnits.forEach(unit => {
        associations.push(`└─ ${unit.nome} (${unit.numero})`);
      });
    });

    return associations.map((item, index) => (
      <div key={index} className="whitespace-nowrap">
        {item}
      </div>
    ));
  };

  return (
    <Card className="mt-16">
      <CardHeader>
        <CardTitle>Lista de Usuários</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Empresa/UC</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Tipo</TableHead>
              {isAdmin && <TableHead className="text-right">Ações</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.nome}</TableCell>
                <TableCell className="align-top">
                  {renderAssociations(user.empresas || [], user.unidadesConsumidoras || [])}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.fone}</TableCell>
                <TableCell>
                  {user.isAdmin ? "Administrador" : user.isSuperUser ? "Super Usuário" : "Usuário"}
                </TableCell>
                {isAdmin && (
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingUser(user)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteUser(user.id)}
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

export default UserList;