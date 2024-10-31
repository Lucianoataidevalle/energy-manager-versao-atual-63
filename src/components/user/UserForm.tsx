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

const UserForm = () => {
  const [formData, setFormData] = useState({
    empresa: "",
    nome: "",
    funcao: "",
    fone: "",
    email: "",
    senha: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement user registration logic
    toast.success("Usuário cadastrado com sucesso!");
    setFormData({
      empresa: "",
      nome: "",
      funcao: "",
      fone: "",
      email: "",
      senha: "",
    });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Cadastro de Usuário</CardTitle>
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
            <label htmlFor="nome">Nome completo</label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="funcao">Função/Cargo</label>
            <Input
              id="funcao"
              value={formData.funcao}
              onChange={(e) =>
                setFormData({ ...formData, funcao: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="senha">Senha</label>
            <Input
              id="senha"
              type="password"
              value={formData.senha}
              onChange={(e) =>
                setFormData({ ...formData, senha: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Cadastrar Usuário
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;