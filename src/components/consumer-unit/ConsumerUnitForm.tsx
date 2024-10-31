import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const ConsumerUnitForm = () => {
  const [formData, setFormData] = useState({
    empresa: "",
    nome: "",
    numero: "",
    endereco: "",
    distribuidora: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement consumer unit registration logic
    toast.success("Unidade Consumidora cadastrada com sucesso!");
    setFormData({
      empresa: "",
      nome: "",
      numero: "",
      endereco: "",
      distribuidora: "",
    });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Unidade Consumidora (UC)</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label>Empresa</label>
            <Select
              value={formData.empresa}
              onValueChange={(value) =>
                setFormData({ ...formData, empresa: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Empresa Exemplo 1</SelectItem>
                <SelectItem value="2">Empresa Exemplo 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="nome">Nome (Apelido) da UC</label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="numero">Número da UC</label>
            <Input
              id="numero"
              value={formData.numero}
              onChange={(e) =>
                setFormData({ ...formData, numero: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="endereco">Endereço da UC</label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) =>
                setFormData({ ...formData, endereco: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="distribuidora">Distribuidora de Energia</label>
            <Input
              id="distribuidora"
              value={formData.distribuidora}
              onChange={(e) =>
                setFormData({ ...formData, distribuidora: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Cadastrar UC
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConsumerUnitForm;