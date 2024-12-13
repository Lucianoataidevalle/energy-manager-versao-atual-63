import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
}

export const FormActions = ({ isEditing, onCancel }: FormActionsProps) => {
  return (
    <div className="flex gap-4">
      <Button type="submit" className="w-full">
        {isEditing ? "Atualizar Unidade Geradora" : "Cadastrar Unidade Geradora"}
      </Button>
      {isEditing && (
        <Button type="button" variant="outline" onClick={onCancel} className="w-full">
          Cancelar Edição
        </Button>
      )}
    </div>
  );
};