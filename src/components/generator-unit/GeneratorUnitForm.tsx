import { useState } from "react";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GeneratorUnitForm = () => {
  const { companies, consumerUnits, addGeneratorUnit } = useData();
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
    
    // Reset form
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

  const availableUnits = consumerUnits.filter(
    unit => unit.empresa === formData.empresa && unit.possuiGeracao
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unidade Geradora</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Empresa</Label>
              <Select
                value={formData.empresa}
                onValueChange={(value) => setFormData({ ...formData, empresa: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a empresa" />
                </SelectTrigger>
                <SelectContent>
                  {companies
                    .sort((a, b) => a.razaoSocial.localeCompare(b.razaoSocial))
                    .map((company) => (
                      <SelectItem key={company.id} value={company.razaoSocial}>
                        {company.razaoSocial}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Unidade Consumidora</Label>
              <Select
                value={formData.unidadeConsumidora}
                onValueChange={(value) => setFormData({ ...formData, unidadeConsumidora: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a unidade consumidora" />
                </SelectTrigger>
                <SelectContent>
                  {availableUnits
                    .sort((a, b) => a.nome.localeCompare(b.nome))
                    .map((unit) => (
                      <SelectItem key={unit.id} value={unit.nome}>
                        {unit.nome}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Geração</Label>
              <Select
                value={formData.tipoGeracao}
                onValueChange={(value) => setFormData({ ...formData, tipoGeracao: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de geração" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solar">Solar Fotovoltaica</SelectItem>
                  <SelectItem value="eolica">Eólica</SelectItem>
                  <SelectItem value="biomassa">Biomassa</SelectItem>
                  <SelectItem value="hidraulica">Hidráulica</SelectItem>
                  <SelectItem value="termica">Térmica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Potência Instalada (kW)</Label>
              <Input
                type="number"
                value={formData.potenciaInstalada}
                onChange={(e) => setFormData({ ...formData, potenciaInstalada: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo de Conexão</Label>
              <Select
                value={formData.tipoConexao}
                onValueChange={(value) => setFormData({ ...formData, tipoConexao: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de conexão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monofasica">Monofásica</SelectItem>
                  <SelectItem value="bifasica">Bifásica</SelectItem>
                  <SelectItem value="trifasica">Trifásica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Estimativa de Geração Mensal (kWh)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries({
                  janeiro: "Janeiro",
                  fevereiro: "Fevereiro",
                  marco: "Março",
                  abril: "Abril",
                  maio: "Maio",
                  junho: "Junho",
                  julho: "Julho",
                  agosto: "Agosto",
                  setembro: "Setembro",
                  outubro: "Outubro",
                  novembro: "Novembro",
                  dezembro: "Dezembro"
                }).map(([key, label]) => (
                  <div key={key} className="space-y-2">
                    <Label>{label}</Label>
                    <Input
                      type="number"
                      value={formData.estimativaGeracao[key as keyof typeof formData.estimativaGeracao]}
                      onChange={(e) => setFormData({
                        ...formData,
                        estimativaGeracao: {
                          ...formData.estimativaGeracao,
                          [key]: e.target.value
                        }
                      })}
                    />
                  </div>
                ))}
              </div>
            </div>
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