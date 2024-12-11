import { useState } from "react";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyUnitSelect } from "./form/CompanyUnitSelect";
import { GenerationTypeFields } from "./form/GenerationTypeFields";
import { MonthlyGenerationFields } from "./form/MonthlyGenerationFields";

const GeneratorUnitForm = () => {
  const { addGeneratorUnit } = useData();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.empresa || !formData.unidadeConsumidora || !formData.tipoGeracao || 
        !formData.potenciaInstalada || !formData.tipoConexao) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    addGeneratorUnit(formData);
    toast.success("Unidade geradora cadastrada com sucesso!");
    
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

          <Button type="submit" className="w-full">
            Cadastrar Unidade Geradora
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GeneratorUnitForm;