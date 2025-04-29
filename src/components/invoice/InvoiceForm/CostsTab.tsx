
import { NumberInput } from "@/components/shared/NumberInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CostsTabProps {
  formData: any;
  setFormData: (data: any) => void;
  isGroupB: boolean;
  shouldDisablePeakFields: boolean;
}

export const CostsTab = ({
  formData,
  setFormData,
  isGroupB,
  shouldDisablePeakFields,
}: CostsTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Bandeira Tarifária</label>
          <Select
            value={formData.bandeiraTarifaria || "verde"}
            onValueChange={(value) => setFormData({ ...formData, bandeiraTarifaria: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a bandeira" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="verde">Verde</SelectItem>
              <SelectItem value="amarela">Amarela</SelectItem>
              <SelectItem value="vermelha1">Vermelha Patamar 1</SelectItem>
              <SelectItem value="vermelha2">Vermelha Patamar 2</SelectItem>
              <SelectItem value="escassez">Escassez Hídrica</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Multas/Juros (R$)</label>
          <NumberInput
            value={formData.multasJuros}
            onChange={(value) => setFormData({ ...formData, multasJuros: value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Valor Total da Fatura (R$)</label>
        <NumberInput
          value={formData.valorFatura}
          onChange={(value) => setFormData({ ...formData, valorFatura: value })}
          required
        />
      </div>
    </div>
  );
};
