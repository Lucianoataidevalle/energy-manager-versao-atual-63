import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    razaoSocial: "",
    cnpj: "",
    endereco: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement company registration logic
    toast.success("Empresa cadastrada com sucesso!");
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
          <Button type="submit" className="w-full">
            Cadastrar Empresa
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanyForm;