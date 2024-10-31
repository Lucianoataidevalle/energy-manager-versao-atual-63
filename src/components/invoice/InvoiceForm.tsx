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

interface InvoiceFormProps {
  onCompanyChange: (company: string) => void;
  onUnitChange: (unit: string) => void;
}

const InvoiceForm = ({ onCompanyChange, onUnitChange }: InvoiceFormProps) => {
  const [formData, setFormData] = useState({
    empresa: "",
    unidade: "",
    mes: "",
    consumoForaPonta: "",
    consumoPonta: "",
    demandaMedida: "",
    demandaUltrapassagem: "",
    valorFatura: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement invoice registration logic
    toast.success("Fatura cadastrada com sucesso!");
    setFormData({
      empresa: "",
      unidade: "",
      mes: "",
      consumoForaPonta: "",
      consumoPonta: "",
      demandaMedida: "",
      demandaUltrapassagem: "",
      valorFatura: "",
    });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Dados da Fatura</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label>Empresa</label>
              <Select
                value={formData.empresa}
                onValueChange={(value) => {
                  setFormData({ ...formData, empresa: value });
                  onCompanyChange(value);
                }}
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
              <label>Unidade Consumidora</label>
              <Select
                value={formData.unidade}
                onValueChange={(value) => {
                  setFormData({ ...formData, unidade: value });
                  onUnitChange(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a UC" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Matriz</SelectItem>
                  <SelectItem value="2">Filial 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label>Mês de Referência</label>
              <Select
                value={formData.mes}
                onValueChange={(value) =>
                  setFormData({ ...formData, mes: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-01">Janeiro/2024</SelectItem>
                  <SelectItem value="2024-02">Fevereiro/2024</SelectItem>
                  <SelectItem value="2024-03">Março/2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="consumoForaPonta">Consumo Fora Ponta (kWh)</label>
              <Input
                id="consumoForaPonta"
                type="number"
                value={formData.consumoForaPonta}
                onChange={(e) =>
                  setFormData({ ...formData, consumoForaPonta: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="consumoPonta">Consumo Ponta (kWh)</label>
              <Input
                id="consumoPonta"
                type="number"
                value={formData.consumoPonta}
                onChange={(e) =>
                  setFormData({ ...formData, consumoPonta: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="demandaMedida">Demanda Medida (kW)</label>
              <Input
                id="demandaMedida"
                type="number"
                value={formData.demandaMedida}
                onChange={(e) =>
                  setFormData({ ...formData, demandaMedida: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="demandaUltrapassagem">
                Demanda de Ultrapassagem (kW)
              </label>
              <Input
                id="demandaUltrapassagem"
                type="number"
                value={formData.demandaUltrapassagem}
                onChange={(e) =>
                  setFormData({ ...formData, demandaUltrapassagem: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="valorFatura">Valor da Fatura (R$)</label>
              <Input
                id="valorFatura"
                type="number"
                step="0.01"
                value={formData.valorFatura}
                onChange={(e) =>
                  setFormData({ ...formData, valorFatura: e.target.value })
                }
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Inserir Fatura
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;