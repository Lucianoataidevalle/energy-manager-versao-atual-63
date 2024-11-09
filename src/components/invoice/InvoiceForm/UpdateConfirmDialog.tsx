import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface UpdateConfirmDialogProps {
  onConfirm: () => void;
  isEditing: boolean;
}

export const UpdateConfirmDialog = ({ onConfirm, isEditing }: UpdateConfirmDialogProps) => {
  if (!isEditing) {
    return (
      <Button type="submit" className="w-full">
        Inserir Fatura
      </Button>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" className="w-full">
          Atualizar Fatura
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Atualizar Fatura</AlertDialogTitle>
          <AlertDialogDescription>
            Deseja realmente atualizar esta fatura? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};