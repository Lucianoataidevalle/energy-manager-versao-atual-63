import { Input } from "@/components/ui/input";
import InputMask from "react-input-mask";

interface CompanyRepresentationProps {
  formData: {
    empresaRepresentada: {
      nome: string;
      cnpj: string;
      endereco: string;
    };
  };
  onChange: (field: string, value: any) => void;
}

export const CompanyRepresentation = ({ formData, onChange }: CompanyRepresentationProps) => {
  const handleChange = (field: string, value: string) => {
    onChange('empresaRepresentada', {
      ...formData.empresaRepresentada,
      [field]: value
    });
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <h3 className="font-medium">Empresa Representada</h3>
      <div className="space-y-2">
        <label htmlFor="empresaNome">Nome da Empresa</label>
        <Input
          id="empresaNome"
          value={formData.empresaRepresentada.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="empresaCnpj">CNPJ</label>
        <InputMask
          mask="99.999.999/9999-99"
          value={formData.empresaRepresentada.cnpj}
          onChange={(e) => handleChange("cnpj", e.target.value)}
          required
        >
          {(inputProps: any) => (
            <Input
              {...inputProps}
              id="empresaCnpj"
              placeholder="XX.XXX.XXX/XXXX-XX"
              type="text"
            />
          )}
        </InputMask>
      </div>
      <div className="space-y-2">
        <label htmlFor="empresaEndereco">Endereço</label>
        <Input
          id="empresaEndereco"
          value={formData.empresaRepresentada.endereco}
          onChange={(e) => handleChange("endereco", e.target.value)}
          required
        />
      </div>
    </div>
  );
};