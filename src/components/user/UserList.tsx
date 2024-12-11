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
import { toast } from "sonner";
import { UpdateConfirmDialog } from "../invoice/InvoiceForm/UpdateConfirmDialog";

const UserList = () => {
  const { users, deleteUser, setEditingUser } = useData();
  const { user: currentUser, isAdmin } = useAuth();

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Erro ao excluir usuário");
    }
  };

  const canEditUser = (userId: string) => {
    return isAdmin || (currentUser && currentUser.id === userId);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Fone</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.nome}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.fone}</TableCell>
              <TableCell>{user.empresas.join(", ")}</TableCell>
              <TableCell className="flex gap-2">
                {canEditUser(user.id) && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setEditingUser(user)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                )}
                {isAdmin && (
                  <UpdateConfirmDialog
                    onConfirm={() => handleDelete(user.id)}
                    isEditing={false}
                    confirmTitle="Excluir Usuário"
                    confirmMessage="Deseja realmente excluir este usuário? Esta ação não pode ser desfeita."
                    buttonText=""
                    buttonIcon={<Trash2 className="h-4 w-4" />}
                    buttonVariant="outline"
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;