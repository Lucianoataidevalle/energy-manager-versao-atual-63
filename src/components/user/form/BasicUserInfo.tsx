import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import InputMask from "react-input-mask";
import { useAuth } from "@/contexts/AuthContext";

interface BasicUserInfoProps {
  formData: {
    nome: string;
    fone: string;
    email: string;
    senha: string;
    isAdmin: boolean;
    isSuperUser: boolean;
  };
  onChange: (field: string, value: any) => void;
}

export const BasicUserInfo = ({ formData, onChange }: BasicUserInfoProps) => {
  const { isAdmin: currentUserIsAdmin } = useAuth();

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