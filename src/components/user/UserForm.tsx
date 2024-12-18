import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { UpdateConfirmDialog } from "../invoice/InvoiceForm/UpdateConfirmDialog";
import { BasicUserInfo } from "./form/BasicUserInfo";
import { CompanyRepresentation } from "./form/CompanyRepresentation";
import { UCAssociationForm } from "./UCAssociationForm";

const UserForm = () => {
  const { addUser, editingUser, editUser, setEditingUser } = useData();
  const { user: currentUser, isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    nome: "",
    fone: "",
    email: "",
    senha: "",
    isAdmin: false,
    isSuperUser: false,
    empresas: [] as string[],
    unidadesConsumidoras: [] as string[],
    empresaRepresentada: {
      nome: "",
      cnpj: "",
      endereco: ""
    }
  });

  useEffect(() => {
    if (!isAdmin && currentUser) {
      setFormData({
        nome: currentUser.nome,
        fone: currentUser.fone,
        email: currentUser.email,
        senha: "",
        isAdmin: currentUser.isAdmin || false,
        isSuperUser: currentUser.isSuperUser || false,
        empresas: currentUser.empresas || [],
        unidadesConsumidoras: currentUser.unidadesConsumidoras || [],
        empresaRepresentada: currentUser.empresaRepresentada || {
          nome: "",
          cnpj: "",
          endereco: ""
        }
      });
    } else if (editingUser) {
      setFormData({
        nome: editingUser.nome,
        fone: editingUser.fone,
        email: editingUser.email,
        senha: "",
        isAdmin: editingUser.isAdmin || false,
        isSuperUser: editingUser.isSuperUser || false,
        empresas: editingUser.empresas || [],
        unidadesConsumidoras: editingUser.unidadesConsumidoras || [],
        empresaRepresentada: editingUser.empresaRepresentada || {
          nome: "",
          cnpj: "",
          endereco: ""
        }
      });
    }
  }, [editingUser, currentUser, isAdmin]);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUCAssociationUpdate = (empresas: string[], unidades: string[]) => {
    setFormData(prev => ({
      ...prev,
      empresas,
      unidadesConsumidoras: unidades
    }));
  };

  const handleSubmit = () => {
    if (!isAdmin && currentUser) {
      editUser(currentUser.id, formData);
      toast.success("Dados atualizados com sucesso!");
    } else if (editingUser) {
      editUser(editingUser.id, formData);
      toast.success("Usuário atualizado com sucesso!");
      handleCancel();
    } else {
      addUser(formData);
      toast.success("Usuário cadastrado com sucesso!");
      setFormData({
        nome: "",
        fone: "",
        email: "",
        senha: "",
        isAdmin: false,
        isSuperUser: false,
        empresas: [],
        unidadesConsumidoras: [],
        empresaRepresentada: {
          nome: "",
          cnpj: "",
          endereco: ""
        }
      });
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFormData({
      nome: "",
      fone: "",
      email: "",
      senha: "",
      isAdmin: false,
      isSuperUser: false,
      empresas: [],
      unidadesConsumidoras: [],
      empresaRepresentada: {
        nome: "",
        cnpj: "",
        endereco: ""
      }
    });
    toast.info("Edição cancelada");
  };

  const getFormTitle = () => {
    if (!isAdmin) return "Meus Dados";
    return editingUser ? "Editar Usuário" : "Cadastro de Usuário";
  };

  const getButtonText = () => {
    if (!isAdmin) return "Atualizar Meus Dados";
    return editingUser ? "Atualizar Usuário" : "Cadastrar Usuário";
  };

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{getFormTitle()}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <BasicUserInfo
              formData={formData}
              onChange={handleFieldChange}
            />
            <CompanyRepresentation
              formData={formData}
              onChange={handleFieldChange}
            />
            <div className="flex gap-2">
              <UpdateConfirmDialog 
                onConfirm={handleSubmit}
                isEditing={!!editingUser || !isAdmin}
                confirmTitle={getButtonText()}
                confirmMessage={!isAdmin 
                  ? "Deseja realmente atualizar seus dados? Esta ação não pode ser desfeita."
                  : editingUser 
                    ? "Deseja realmente atualizar este usuário? Esta ação não pode ser desfeita."
                    : "Deseja realmente cadastrar este usuário? Esta ação não pode ser desfeita."
                }
                buttonText={getButtonText()}
              />
              {isAdmin && editingUser && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar Edição
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {isAdmin && (editingUser || currentUser) && (
        <UCAssociationForm
          userId={editingUser?.id || currentUser?.id || ''}
          currentEmpresas={formData.empresas}
          currentUnidades={formData.unidadesConsumidoras}
          onUpdate={handleUCAssociationUpdate}
        />
      )}
    </>
  );
};

export default UserForm;