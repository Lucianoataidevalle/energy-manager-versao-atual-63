import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoProps {
  formData: {
    nome: string;
    numero: string;
    endereco: string;
    distribuidora: string;
  };
  onChange: (field: string, value: string) => void;
}

export const BasicInfo = ({ formData, onChange }: BasicInfoProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="nome">Nome da UC</Label>
        <Input
          id="nome"
          value={formData.nome}
          onChange={(e) => onChange("nome", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="numero">Número da UC</Label>
        <Input
          id="numero"
          value={formData.numero}
          onChange={(e) => onChange("numero", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="endereco">Endereço da UC</Label>
        <Input
          id="endereco"
          value={formData.endereco}
          onChange={(e) => onChange("endereco", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="distribuidora">Distribuidora de Energia</Label>
        <Input
          id="distribuidora"
          value={formData.distribuidora}
          onChange={(e) => onChange("distribuidora", e.target.value)}
          required
        />
      </div>
    </>
  );
};