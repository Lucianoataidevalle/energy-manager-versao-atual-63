import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import InputMask from "react-input-mask";
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

const CompanyForm = () => {
  const { editingCompany, editCompany, addCompany } = useData();
  const [formData, setFormData] = useState({
    razaoSocial: "",
    cnpj: "",
    endereco: "",
  });

  useEffect(() => {
    if (editingCompany) {
      setFormData({
        razaoSocial: editingCompany.razaoSocial,
        cnpj: editingCompany.cnpj,
        endereco: editingCompany.endereco,
      });
    }
  }, [editingCompany]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!editingCompany) {
        await addCompany({
          ...formData,
          unidades: [],
        });
        toast.success("Empresa cadastrada com sucesso!");
        setFormData({ razaoSocial: "", cnpj: "", endereco: "" });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Erro ao cadastrar empresa");
    }
  };

  const handleUpdate = async () => {
    try {
      if (editingCompany?.id) {
        await editCompany(editingCompany.id, formData);
        toast.success("Empresa atualizada com sucesso!");
        setFormData({ razaoSocial: "", cnpj: "", endereco: "" });
      }
    } catch (error) {
      console.error('Error updating company:', error);
      toast.error("Erro ao atualizar empresa");
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Informações Cadastrais</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="razaoSocial">Razão Social</label>
            <Input
              id="razaoSocial"
              value={formData.razaoSocial}
              onChange={(e) =>
                setFormData({ ...formData, razaoSocial: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="cnpj">CNPJ</label>
            <InputMask
              mask="99.999.999/9999-99"
              value={formData.cnpj}
              onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
              required
            >
              {(inputProps: any) => (
                <Input
                  {...inputProps}
                  id="cnpj"
                  placeholder="00.000.000/0000-00"
                  type="text"
                />
              )}
            </InputMask>
          </div>
          <div className="space-y-2">
            <label htmlFor="endereco">Endereço</label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) =>
                setFormData({ ...formData, endereco: e.target.value })
              }
              required
            />
          </div>
          {editingCompany ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" className="w-full">
                  Atualizar Empresa
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Atualizar Empresa</AlertDialogTitle>
                  <AlertDialogDescription>
                    Deseja realmente atualizar esta empresa?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleUpdate}>
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button type="submit" className="w-full">
              Cadastrar Empresa
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanyForm;