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

const mockUsers = [
  {
    id: 1,
    empresa: "Empresa Exemplo 1",
    nome: "João Silva",
    funcao: "Gerente",
    fone: "(11) 99999-9999",
    email: "joao@exemplo.com",
  },
  {
    id: 2,
    empresa: "Empresa Exemplo 2",
    nome: "Maria Santos",
    funcao: "Analista",
    fone: "(11) 88888-8888",
    email: "maria@exemplo.com",
  },
];

const UserList = () => {
  const handleEdit = (id: number) => {
    // TODO: Implement edit logic
    console.log("Edit user", id);
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete logic
    console.log("Delete user", id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de usuários</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Função/Cargo</TableHead>
              <TableHead>Fone</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.empresa}</TableCell>
                <TableCell>{user.nome}</TableCell>
                <TableCell>{user.funcao}</TableCell>
                <TableCell>{user.fone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(user.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(user.id)}
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

export default UserList;