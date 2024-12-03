import { Button } from "@/components/ui/button";
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

interface UpdateConfirmDialogProps {
  onConfirm: (e: React.FormEvent) => void;
  isEditing: boolean;
  confirmTitle: string;
  confirmMessage: string;
  buttonText: string;
}

export const UpdateConfirmDialog = ({
  onConfirm,
  isEditing,
  confirmTitle,
  confirmMessage,
  buttonText,
}: UpdateConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" className="w-full">
          {buttonText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
          <AlertDialogDescription>{confirmMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};