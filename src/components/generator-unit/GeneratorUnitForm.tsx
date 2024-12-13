import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyUnitSelect } from "./form/CompanyUnitSelect";
import { GenerationTypeFields } from "./form/GenerationTypeFields";
import { MonthlyGenerationFields } from "./form/MonthlyGenerationFields";

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
      setFormData(editingGeneratorUnit);
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

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              {editingGeneratorUnit ? "Atualizar Unidade Geradora" : "Cadastrar Unidade Geradora"}
            </Button>
            {editingGeneratorUnit && (
              <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
                Cancelar Edição
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default GeneratorUnitForm;