import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TariffFieldsProps {
  formData: {
    modalidadeTarifaria: string;
    demandaContratada: string;
    demandaContratadaPonta: string;
    demandaContratadaForaPonta: string;
  };
  showModalidadeTarifaria: boolean;
  onChange: (field: string, value: string) => void;
  isAzulTariff: boolean;
  showDemandaContratada: boolean;
}

export const TariffFields = ({ 
  formData, 
  showModalidadeTarifaria, 
  onChange,
  isAzulTariff,
  showDemandaContratada
}: TariffFieldsProps) => {
  return (
    <>
      {showModalidadeTarifaria && (
        <div className="space-y-2">
          <Label htmlFor="modalidadeTarifaria">Modalidade Tarifária</Label>
          <Select
            value={formData.modalidadeTarifaria}
            onValueChange={(value) => onChange("modalidadeTarifaria", value)}
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

      {showDemandaContratada && (
        <div className="space-y-2">
          <Label htmlFor="demandaContratada">Demanda Contratada (kW)</Label>
          <Input
            id="demandaContratada"
            type="number"
            value={formData.demandaContratada}
            onChange={(e) => onChange("demandaContratada", e.target.value)}
            required
          />
        </div>
      )}

      {isAzulTariff && (
        <>
          <div className="space-y-2">
            <Label htmlFor="demandaContratadaForaPonta">Demanda Contratada Fora Ponta (kW)</Label>
            <Input
              id="demandaContratadaForaPonta"
              type="number"
              value={formData.demandaContratadaForaPonta}
              onChange={(e) => onChange("demandaContratadaForaPonta", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="demandaContratadaPonta">Demanda Contratada Ponta (kW)</Label>
            <Input
              id="demandaContratadaPonta"
              type="number"
              value={formData.demandaContratadaPonta}
              onChange={(e) => onChange("demandaContratadaPonta", e.target.value)}
              required
            />
          </div>
        </>
      )}
    </>
  );
};