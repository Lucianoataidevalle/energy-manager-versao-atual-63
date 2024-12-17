import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const UserList = () => {
  const { users, deleteUser, setEditingUser, companies, consumerUnits } = useData();
  const { isAdmin } = useAuth();
  const [openUsers, setOpenUsers] = useState<string[]>([]);

  const toggleUser = (userId: string) => {
    setOpenUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  // Sort users alphabetically by name
  const sortedUsers = [...users].sort((a, b) => a.nome.localeCompare(b.nome));

  const getUserCompanies = (user: any) => {
    if (!user.empresas) return [];
    return companies
      .filter(company => user.empresas.includes(company.razaoSocial))
      .sort((a, b) => a.razaoSocial.localeCompare(b.razaoSocial));
  };

  const getCompanyUnits = (user: any, companyName: string) => {
    if (!user.unidadesConsumidoras) return [];
    return consumerUnits
      .filter(unit => 
        unit.empresa === companyName && 
        user.unidadesConsumidoras.includes(unit.numero)
      )
      .sort((a, b) => a.nome.localeCompare(b.nome));
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
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Tipo</TableHead>
              {isAdmin && <TableHead className="text-right">Ações</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user) => (
              <>
                <TableRow key={user.id}>
                  <TableCell>
                    <CollapsibleTrigger
                      onClick={() => toggleUser(user.id)}
                      className="flex items-center gap-2 hover:text-primary cursor-pointer"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openUsers.includes(user.id) ? "transform rotate-180" : ""
                        }`}
                      />
                      {user.nome}
                    </CollapsibleTrigger>
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
                <TableRow>
                  <TableCell colSpan={5}>
                    <CollapsibleContent
                      className={openUsers.includes(user.id) ? "block" : "hidden"}
                    >
                      <div className="pl-6 py-2">
                        {getUserCompanies(user).map(company => (
                          <div key={company.id} className="mb-4">
                            <h4 className="font-medium text-sm">{company.razaoSocial}</h4>
                            <div className="pl-4 mt-1">
                              {getCompanyUnits(user, company.razaoSocial).map(unit => (
                                <p key={unit.id} className="text-sm text-gray-600">
                                  {unit.nome}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserList;