import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GenerationTypeFieldsProps {
  formData: {
    tipoGeracao: string;
    potenciaInstalada: string;
    tipoConexao: string;
  };
  setFormData: (data: any) => void;
}

export const GenerationTypeFields = ({ formData, setFormData }: GenerationTypeFieldsProps) => {
  return (
    <>
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
    </>
  );
};