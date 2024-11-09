import { useState, useEffect } from "react";
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
import { useData } from "@/contexts/DataContext";

const ConsumerUnitForm = () => {
  const { companies, addConsumerUnit, editingConsumerUnit, editConsumerUnit } = useData();
  const [formData, setFormData] = useState({
    empresa: "",
    nome: "",
    numero: "",
    endereco: "",
    demandaContratada: "",
    distribuidora: "",
  });

  useEffect(() => {
    if (editingConsumerUnit) {
      setFormData({
        empresa: editingConsumerUnit.empresa,
        nome: editingConsumerUnit.nome,
        numero: editingConsumerUnit.numero,
        endereco: editingConsumerUnit.endereco,
        demandaContratada: editingConsumerUnit.demandaContratada,
        distribuidora: editingConsumerUnit.distribuidora,
      });
    }
  }, [editingConsumerUnit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingConsumerUnit) {
      addConsumerUnit({
        ...formData,
        id: Date.now(),
      });
      toast.success("Unidade Consumidora cadastrada com sucesso!");
    } else {
      editConsumerUnit(editingConsumerUnit.id, formData);
      toast.success("Unidade Consumidora atualizada com sucesso!");
    }
    setFormData({
      empresa: "",
      nome: "",
      numero: "",
      endereco: "",
      demandaContratada: "",
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
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.razaoSocial}>
                    {company.razaoSocial}
                  </SelectItem>
                ))}
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
            <label htmlFor="demandaContratada">Demanda Contratada</label>
            <Input
              id="demandaContratada"
              type="number"
              value={formData.demandaContratada}
              onChange={(e) =>
                setFormData({ ...formData, demandaContratada: e.target.value })
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
            {editingConsumerUnit ? "Atualizar UC" : "Cadastrar UC"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConsumerUnitForm;