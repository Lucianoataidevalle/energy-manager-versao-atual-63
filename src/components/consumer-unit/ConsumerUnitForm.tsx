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
    grupoSubgrupo: "",
    modalidadeTarifaria: "",
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
        grupoSubgrupo: editingConsumerUnit.grupoSubgrupo || "",
        modalidadeTarifaria: editingConsumerUnit.modalidadeTarifaria || "",
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
      grupoSubgrupo: "",
      modalidadeTarifaria: "",
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
            <label htmlFor="nome">Nome da UC</label>
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
          <div className="space-y-2">
            <label>Grupo/Subgrupo</label>
            <Select
              value={formData.grupoSubgrupo}
              onValueChange={(value) => {
                setFormData({ 
                  ...formData, 
                  grupoSubgrupo: value,
                  modalidadeTarifaria: value === "B" ? "" : formData.modalidadeTarifaria,
                  demandaContratada: value === "B" ? "" : formData.demandaContratada
                })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o grupo/subgrupo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="A3a">A3a</SelectItem>
                <SelectItem value="A4">A4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label>Modalidade Tarifária</label>
            <Select
              value={formData.modalidadeTarifaria}
              onValueChange={(value) =>
                setFormData({ ...formData, modalidadeTarifaria: value })
              }
              disabled={formData.grupoSubgrupo === "B"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a modalidade tarifária" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Verde">Verde</SelectItem>
                <SelectItem value="Azul">Azul</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="demandaContratada">Demanda Contratada (kW)</label>
            <Input
              id="demandaContratada"
              type="number"
              value={formData.demandaContratada}
              onChange={(e) =>
                setFormData({ ...formData, demandaContratada: e.target.value })
              }
              disabled={formData.grupoSubgrupo === "B"}
              required={formData.grupoSubgrupo !== "B"}
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