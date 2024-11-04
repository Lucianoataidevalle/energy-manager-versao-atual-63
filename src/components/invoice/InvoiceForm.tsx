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
import { format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { useData } from "@/contexts/DataContext";

interface InvoiceFormProps {
  onCompanyChange: (company: string) => void;
  onUnitChange: (unit: string) => void;
}

const InvoiceForm = ({ onCompanyChange, onUnitChange }: InvoiceFormProps) => {
  const { companies, consumerUnits, addInvoice, editingInvoice, editInvoice } = useData();
  const [formData, setFormData] = useState({
    empresa: "",
    unidade: "",
    mes: format(subMonths(new Date(), 1), "yyyy-MM"),
    consumoForaPonta: "",
    consumoPonta: "",
    demandaMedida: "",
    demandaUltrapassagem: "",
    valorFatura: "",
  });

  useEffect(() => {
    if (editingInvoice) {
      setFormData({
        empresa: editingInvoice.empresa,
        unidade: editingInvoice.unidade,
        mes: editingInvoice.mes,
        consumoForaPonta: editingInvoice.consumoForaPonta.toString(),
        consumoPonta: editingInvoice.consumoPonta.toString(),
        demandaMedida: editingInvoice.demandaMedida.toString(),
        demandaUltrapassagem: editingInvoice.demandaUltrapassagem.toString(),
        valorFatura: editingInvoice.valorFatura.toString(),
      });
    }
  }, [editingInvoice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const invoiceData = {
      ...formData,
      consumoForaPonta: Number(formData.consumoForaPonta),
      consumoPonta: Number(formData.consumoPonta),
      demandaMedida: Number(formData.demandaMedida),
      demandaUltrapassagem: Number(formData.demandaUltrapassagem),
      valorFatura: Number(formData.valorFatura),
    };

    if (!editingInvoice) {
      addInvoice({
        ...invoiceData,
        id: Date.now(),
      });
      toast.success("Fatura cadastrada com sucesso!", {
        position: "top-right",
      });
    } else {
      editInvoice(editingInvoice.id, invoiceData);
      toast.success("Fatura atualizada com sucesso!", {
        position: "top-right",
      });
    }

    setFormData({
      empresa: "",
      unidade: "",
      mes: format(subMonths(new Date(), 1), "yyyy-MM"),
      consumoForaPonta: "",
      consumoPonta: "",
      demandaMedida: "",
      demandaUltrapassagem: "",
      valorFatura: "",
    });
  };

  const availableUnits = consumerUnits.filter(
    (unit) => unit.empresa === formData.empresa
  );

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
                  setFormData({ ...formData, empresa: value, unidade: "" });
                  onCompanyChange(value);
                }}
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
                  {availableUnits.map((unit) => (
                    <SelectItem key={unit.id} value={unit.nome}>
                      {unit.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label>Mês de Referência</label>
              <Input
                type="month"
                value={formData.mes}
                onChange={(e) => setFormData({ ...formData, mes: e.target.value })}
                required
              />
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
            {editingInvoice ? "Atualizar Fatura" : "Inserir Fatura"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;