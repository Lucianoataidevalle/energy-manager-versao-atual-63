import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import InputMask from "react-input-mask";
import { useAuth } from "@/contexts/AuthContext";

interface UserFormFieldsProps {
  formData: {
    nome: string;
    fone: string;
    email: string;
    senha: string;
    isAdmin: boolean;
    isSuperUser: boolean;
    empresaRepresentada: {
      nome: string;
      cnpj: string;
      endereco: string;
    };
  };
  onChange: (field: string, value: any) => void;
}

export const UserFormFields = ({ formData, onChange }: UserFormFieldsProps) => {
  const { isAdmin: currentUserIsAdmin, user: currentUser } = useAuth();

  const handleEmpresaRepresentadaChange = (field: string, value: string) => {
    onChange('empresaRepresentada', {
      ...formData.empresaRepresentada,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="nome">Nome completo</label>
        <Input
          id="nome"
          value={formData.nome}
          onChange={(e) => onChange("nome", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="fone">Fone</label>
        <InputMask
          mask="(99) 99999-9999"
          value={formData.fone}
          onChange={(e) => onChange("fone", e.target.value)}
          required
        >
          {(inputProps: any) => (
            <Input
              {...inputProps}
              id="fone"
              placeholder="(XX) XXXXX-XXXX"
              type="text"
            />
          )}
        </InputMask>
      </div>
      <div className="space-y-2">
        <label htmlFor="email">E-mail (Login)</label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="senha">Senha</label>
        <Input
          id="senha"
          type="password"
          value={formData.senha}
          onChange={(e) => onChange("senha", e.target.value)}
          required
        />
      </div>

      <div className="space-y-4 border-t pt-4">
        <h3 className="font-medium">Empresa Representada</h3>
        <div className="space-y-2">
          <label htmlFor="empresaNome">Nome da Empresa</label>
          <Input
            id="empresaNome"
            value={formData.empresaRepresentada.nome}
            onChange={(e) => handleEmpresaRepresentadaChange("nome", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="empresaCnpj">CNPJ</label>
          <InputMask
            mask="99.999.999/9999-99"
            value={formData.empresaRepresentada.cnpj}
            onChange={(e) => handleEmpresaRepresentadaChange("cnpj", e.target.value)}
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
            onChange={(e) => handleEmpresaRepresentadaChange("endereco", e.target.value)}
            required
          />
        </div>
      </div>

      {currentUserIsAdmin && (
        <div className="space-y-4 border-t pt-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAdmin"
              checked={formData.isAdmin}
              onCheckedChange={(checked) =>
                onChange("isAdmin", checked as boolean)
              }
            />
            <label
              htmlFor="isAdmin"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Administrador
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isSuperUser"
              checked={formData.isSuperUser}
              onCheckedChange={(checked) =>
                onChange("isSuperUser", checked as boolean)
              }
            />
            <label
              htmlFor="isSuperUser"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Super Usuário
            </label>
          </div>
        </div>
      )}
    </div>
  );
};