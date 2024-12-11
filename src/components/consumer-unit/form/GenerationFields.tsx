import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GenerationFieldsProps {
  formData: {
    possuiGeracao: boolean;
    modalidadeCompensacao: string;
  };
  onChange: (field: string, value: any) => void;
}

export const GenerationFields = ({ formData, onChange }: GenerationFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label>Há compensação de energia por geração?</Label>
        <RadioGroup
          value={formData.possuiGeracao ? "sim" : "nao"}
          onValueChange={(value) => {
            onChange("possuiGeracao", value === "sim");
            if (value === "nao") {
              onChange("modalidadeCompensacao", "");
            }
          }}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sim" id="sim" />
            <Label htmlFor="sim">Sim</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="nao" />
            <Label htmlFor="nao">Não</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.possuiGeracao && (
        <div className="space-y-2">
          <Label htmlFor="modalidadeCompensacao">Modalidade de Compensação</Label>
          <Select
            value={formData.modalidadeCompensacao}
            onValueChange={(value) => onChange("modalidadeCompensacao", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a modalidade de compensação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="geracaoJuntoCarga">Geração junto à carga</SelectItem>
              <SelectItem value="autoconsumoRemoto">Autoconsumo remoto</SelectItem>
              <SelectItem value="geracaoCompartilhada">Geração compartilhada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};