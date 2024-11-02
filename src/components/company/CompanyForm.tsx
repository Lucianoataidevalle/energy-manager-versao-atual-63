import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompany) {
      addCompany({
        ...formData,
        id: Date.now(),
        unidades: [],
      });
      toast.success("Empresa cadastrada com sucesso!");
      setFormData({ razaoSocial: "", cnpj: "", endereco: "" });
    }
  };

  const handleUpdate = () => {
    if (editingCompany) {
      editCompany(editingCompany.id, formData);
      toast.success("Empresa atualizada com sucesso!");
    }
    setFormData({ razaoSocial: "", cnpj: "", endereco: "" });
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
            <Input
              id="cnpj"
              value={formData.cnpj}
              onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
              required
            />
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