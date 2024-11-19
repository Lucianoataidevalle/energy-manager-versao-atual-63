import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface ChartCommentBoxProps {
  chartId: string;
  title?: string;
}

const ChartCommentBox = ({ chartId, title }: ChartCommentBoxProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Comentário salvo",
      description: "Seu comentário foi salvo com sucesso.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title || "Observações"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Digite seu comentário aqui..."
              className="min-h-[100px]"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {comment ? (
              <p className="text-sm text-gray-600">{comment}</p>
            ) : (
              <p className="text-sm text-gray-400 italic">
                Nenhum comentário adicionado
              </p>
            )}
          </div>
        )}
      </CardContent>
      {!isEditing && (
        <div className="flex justify-end p-4">
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Editar
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ChartCommentBox;