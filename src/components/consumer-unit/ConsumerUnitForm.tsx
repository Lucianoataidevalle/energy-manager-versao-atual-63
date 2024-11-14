import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ConsumerUnitForm = () => {
  const { addConsumerUnit, editingConsumerUnit, editConsumerUnit } = useData();
  const [formData, setFormData] = useState({
    empresa: "",
    nome: "",
    numero: "",
    endereco: "",
    demandaContratada: "",
    demandaContratadaPonta: "",
    demandaContratadaForaPonta: "",
    distribuidora: "",
    grupoSubgrupo: "",
    modalidadeTarifaria: "",
  });

  const [showModalidadeTarifaria, setShowModalidadeTarifaria] = useState(false);

  useEffect(() => {
    if (editingConsumerUnit) {
      setFormData(editingConsumerUnit);
      setShowModalidadeTarifaria(["A3a", "A4"].includes(editingConsumerUnit.grupoSubgrupo));
    }
  }, [editingConsumerUnit]);

  const handleGrupoSubgrupoChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      grupoSubgrupo: value,
      modalidadeTarifaria: "",
      demandaContratada: "",
      demandaContratadaPonta: "",
      demandaContratadaForaPonta: "",
    }));
    setShowModalidadeTarifaria(["A3a", "A4"].includes(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingConsumerUnit) {
      addConsumerUnit(formData);
      toast.success("Unidade consumidora cadastrada com sucesso!");
    } else {
      editConsumerUnit(editingConsumerUnit.id, formData);
      toast.success("Unidade consumidora atualizada com sucesso!");
    }

    setFormData({
      empresa: "",
      nome: "",
      numero: "",
      endereco: "",
      demandaContratada: "",
      demandaContratadaPonta: "",
      demandaContratadaForaPonta: "",
      distribuidora: "",
      grupoSubgrupo: "",
      modalidadeTarifaria: "",
    });
    setShowModalidadeTarifaria(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unidade Consumidora (UC)</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa</Label>
              <Input
                id="empresa"
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome">Nome da UC</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numero">Número da UC</Label>
              <Input
                id="numero"
                value={formData.numero}
                onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço da UC</Label>
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="distribuidora">Distribuidora de Energia</Label>
              <Input
                id="distribuidora"
                value={formData.distribuidora}
                onChange={(e) => setFormData({ ...formData, distribuidora: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grupoSubgrupo">Grupo/Subgrupo</Label>
              <Select
                value={formData.grupoSubgrupo}
                onValueChange={handleGrupoSubgrupoChange}
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

            {showModalidadeTarifaria && (
              <div className="space-y-2">
                <Label htmlFor="modalidadeTarifaria">Modalidade Tarifária</Label>
                <Select
                  value={formData.modalidadeTarifaria}
                  onValueChange={(value) => setFormData({ ...formData, modalidadeTarifaria: value })}
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
            )}

            {(formData.grupoSubgrupo === "B" || formData.modalidadeTarifaria === "Verde") && (
              <div className="space-y-2">
                <Label htmlFor="demandaContratada">Demanda Contratada (kW)</Label>
                <Input
                  id="demandaContratada"
                  type="number"
                  value={formData.demandaContratada}
                  onChange={(e) => setFormData({ ...formData, demandaContratada: e.target.value })}
                  required
                />
              </div>
            )}

            {formData.modalidadeTarifaria === "Azul" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="demandaContratadaForaPonta">Demanda Contratada Fora Ponta (kW)</Label>
                  <Input
                    id="demandaContratadaForaPonta"
                    type="number"
                    value={formData.demandaContratadaForaPonta}
                    onChange={(e) => setFormData({ ...formData, demandaContratadaForaPonta: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demandaContratadaPonta">Demanda Contratada Ponta (kW)</Label>
                  <Input
                    id="demandaContratadaPonta"
                    type="number"
                    value={formData.demandaContratadaPonta}
                    onChange={(e) => setFormData({ ...formData, demandaContratadaPonta: e.target.value })}
                    required
                  />
                </div>
              </>
            )}
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