import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanySelect } from "./form/CompanySelect";
import { BasicInfo } from "./form/BasicInfo";
import { GroupSubgroupSelect } from "./form/GroupSubgroupSelect";
import { TariffFields } from "./form/TariffFields";
import { GenerationFields } from "./form/GenerationFields";

const ConsumerUnitForm = () => {
  const { addConsumerUnit, editingConsumerUnit, editConsumerUnit, setEditingConsumerUnit } = useData();
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
    possuiGeracao: false,
    modalidadeCompensacao: "",
  });

  const [showModalidadeTarifaria, setShowModalidadeTarifaria] = useState(false);

  useEffect(() => {
    if (editingConsumerUnit) {
      setFormData({
        ...editingConsumerUnit,
        possuiGeracao: editingConsumerUnit.possuiGeracao || false,
        modalidadeCompensacao: editingConsumerUnit.modalidadeCompensacao || "",
      });
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

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

    handleCancel();
  };

  const handleCancel = () => {
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
      possuiGeracao: false,
      modalidadeCompensacao: "",
    });
    setShowModalidadeTarifaria(false);
    setEditingConsumerUnit(null);
  };

  const showDemandaContratada = formData.grupoSubgrupo === "B" || formData.modalidadeTarifaria === "Verde";
  const isAzulTariff = formData.modalidadeTarifaria === "Azul";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unidade Consumidora (UC)</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <CompanySelect
              value={formData.empresa}
              onChange={(value) => handleFieldChange("empresa", value)}
            />

            <BasicInfo
              formData={formData}
              onChange={handleFieldChange}
            />

            <GroupSubgroupSelect
              value={formData.grupoSubgrupo}
              onChange={handleGrupoSubgrupoChange}
            />

            <TariffFields
              formData={formData}
              showModalidadeTarifaria={showModalidadeTarifaria}
              onChange={handleFieldChange}
              isAzulTariff={isAzulTariff}
              showDemandaContratada={showDemandaContratada}
            />

            <GenerationFields
              formData={formData}
              onChange={handleFieldChange}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              {editingConsumerUnit ? "Atualizar UC" : "Cadastrar UC"}
            </Button>
            {editingConsumerUnit && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar Edição
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConsumerUnitForm;