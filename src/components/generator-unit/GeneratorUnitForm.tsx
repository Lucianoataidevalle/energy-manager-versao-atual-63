import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyUnitSelect } from "./form/CompanyUnitSelect";
import { GenerationTypeFields } from "./form/GenerationTypeFields";
import { MonthlyGenerationFields } from "./form/MonthlyGenerationFields";
import { FormActions } from "./form/FormActions";

const GeneratorUnitForm = () => {
  const { addGeneratorUnit, editingGeneratorUnit, editGeneratorUnit, setEditingGeneratorUnit } = useData();
  const [formData, setFormData] = useState({
    empresa: "",
    unidadeConsumidora: "",
    tipoGeracao: "",
    potenciaInstalada: "",
    tipoConexao: "",
    estimativaGeracao: {
      janeiro: "",
      fevereiro: "",
      marco: "",
      abril: "",
      maio: "",
      junho: "",
      julho: "",
      agosto: "",
      setembro: "",
      outubro: "",
      novembro: "",
      dezembro: "",
    },
  });

  useEffect(() => {
    if (editingGeneratorUnit) {
      setFormData({
        empresa: editingGeneratorUnit.empresa,
        unidadeConsumidora: editingGeneratorUnit.unidadeConsumidora,
        tipoGeracao: editingGeneratorUnit.tipoGeracao,
        potenciaInstalada: editingGeneratorUnit.potenciaInstalada,
        tipoConexao: editingGeneratorUnit.tipoConexao,
        estimativaGeracao: {
          janeiro: editingGeneratorUnit.estimativaGeracao.janeiro,
          fevereiro: editingGeneratorUnit.estimativaGeracao.fevereiro,
          marco: editingGeneratorUnit.estimativaGeracao.marco,
          abril: editingGeneratorUnit.estimativaGeracao.abril,
          maio: editingGeneratorUnit.estimativaGeracao.maio,
          junho: editingGeneratorUnit.estimativaGeracao.junho,
          julho: editingGeneratorUnit.estimativaGeracao.julho,
          agosto: editingGeneratorUnit.estimativaGeracao.agosto,
          setembro: editingGeneratorUnit.estimativaGeracao.setembro,
          outubro: editingGeneratorUnit.estimativaGeracao.outubro,
          novembro: editingGeneratorUnit.estimativaGeracao.novembro,
          dezembro: editingGeneratorUnit.estimativaGeracao.dezembro,
        },
      });
    }
  }, [editingGeneratorUnit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.empresa || !formData.unidadeConsumidora || !formData.tipoGeracao || 
        !formData.potenciaInstalada || !formData.tipoConexao) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (editingGeneratorUnit) {
      editGeneratorUnit(editingGeneratorUnit.id, formData);
      toast.success("Unidade geradora atualizada com sucesso!");
    } else {
      addGeneratorUnit(formData);
      toast.success("Unidade geradora cadastrada com sucesso!");
    }
    
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({
      empresa: "",
      unidadeConsumidora: "",
      tipoGeracao: "",
      potenciaInstalada: "",
      tipoConexao: "",
      estimativaGeracao: {
        janeiro: "",
        fevereiro: "",
        marco: "",
        abril: "",
        maio: "",
        junho: "",
        julho: "",
        agosto: "",
        setembro: "",
        outubro: "",
        novembro: "",
        dezembro: "",
      },
    });
    setEditingGeneratorUnit(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unidade Geradora</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <CompanyUnitSelect formData={formData} setFormData={setFormData} />
            <GenerationTypeFields formData={formData} setFormData={setFormData} />
            <MonthlyGenerationFields formData={formData} setFormData={setFormData} />
          </div>

          <FormActions 
            isEditing={!!editingGeneratorUnit} 
            onCancel={handleCancel}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default GeneratorUnitForm;