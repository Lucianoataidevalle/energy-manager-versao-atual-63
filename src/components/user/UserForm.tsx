import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { CompanySelect } from "../invoice/InvoiceForm/CompanySelect";
import { UpdateConfirmDialog } from "../invoice/InvoiceForm/UpdateConfirmDialog";

const UserForm = () => {
  const { addUser, editingUser, editUser } = useData();
  const [formData, setFormData] = useState({
    empresas: [] as string[],
    nome: "",
    fone: "",
    email: "",
    senha: "",
    isAdmin: false,
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        empresas: editingUser.empresas,
        nome: editingUser.nome,
        fone: editingUser.fone,
        email: editingUser.email,
        senha: "",
        isAdmin: editingUser.isAdmin || false,
      });
    }
  }, [editingUser]);

  const handleSubmit = () => {
    if (!editingUser) {
      addUser({
        ...formData,
        id: Date.now(),
      });
      toast.success("Usuário cadastrado com sucesso!");
      setFormData({
        empresas: [],
        nome: "",
        fone: "",
        email: "",
        senha: "",
        isAdmin: false,
      });
    } else {
      editUser(editingUser.id, formData);
      toast.success("Usuário atualizado com sucesso!");
    }
  };

  const handleCompanyChange = (company: string) => {
    setFormData(prev => ({
      ...prev,
      empresas: [company]
    }));
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Cadastro de Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <CompanySelect
            value={formData.empresas[0] || ""}
            onChange={handleCompanyChange}
          />
          <div className="space-y-2">
            <label htmlFor="nome">Nome completo</label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="fone">Fone</label>
            <Input
              id="fone"
              value={formData.fone}
              onChange={(e) => setFormData({ ...formData, fone: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email">E-mail (Login)</label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="senha">Senha</label>
            <Input
              id="senha"
              type="password"
              value={formData.senha}
              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAdmin"
              checked={formData.isAdmin}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isAdmin: checked as boolean })
              }
            />
            <label
              htmlFor="isAdmin"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Administrador
            </label>
          </div>
          <UpdateConfirmDialog 
            onConfirm={handleSubmit} 
            isEditing={!!editingUser}
            confirmTitle={editingUser ? "Atualizar Usuário" : "Cadastrar Usuário"}
            confirmMessage={editingUser 
              ? "Deseja realmente atualizar este usuário? Esta ação não pode ser desfeita."
              : "Deseja realmente cadastrar este usuário? Esta ação não pode ser desfeita."
            }
            buttonText={editingUser ? "Atualizar Usuário" : "Cadastrar Usuário"}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;