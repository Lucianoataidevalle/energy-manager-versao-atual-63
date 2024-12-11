import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UpdateConfirmDialogProps {
  onConfirm: () => void;
  isEditing: boolean;
  confirmTitle: string;
  confirmMessage: string;
  buttonText: string;
  buttonIcon?: React.ReactNode;
  buttonVariant?: string;
}

export const UpdateConfirmDialog = ({
  onConfirm,
  isEditing,
  confirmTitle,
  confirmMessage,
  buttonText,
  buttonIcon,
  buttonVariant = "default",
}: UpdateConfirmDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={buttonVariant as any} type="submit" className="w-full" size={buttonIcon ? "icon" : "default"}>
          {buttonIcon || buttonText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
          <AlertDialogDescription>{confirmMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};