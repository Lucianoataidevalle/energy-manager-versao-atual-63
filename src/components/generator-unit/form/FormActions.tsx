import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
}

export const FormActions = ({ isEditing, onCancel }: FormActionsProps) => {
  return (
    <div className="flex gap-4">
      <Button type="submit" className="flex-1">
        {isEditing ? "Atualizar Unidade Geradora" : "Cadastrar Unidade Geradora"}
      </Button>
      {isEditing && (
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancelar Edição
        </Button>
      )}
    </div>
  );
};