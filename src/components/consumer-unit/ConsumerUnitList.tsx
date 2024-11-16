import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useData } from "@/contexts/DataContext";

const ConsumerUnitList = () => {
  const { consumerUnits, deleteConsumerUnit, setEditingConsumerUnit } = useData();

  const renderDemandaContratada = (unit: any) => {
    if (unit.modalidadeTarifaria === "Azul") {
      return (
        <>
          <TableCell>{unit.demandaContratadaPonta}</TableCell>
          <TableCell>{unit.demandaContratadaForaPonta}</TableCell>
        </>
      );
    }
    return (
      <>
        <TableCell>-</TableCell>
        <TableCell>{unit.demandaContratada}</TableCell>
      </>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>UC Cadastradas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Número UC</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Demanda Contratada Ponta (kW)</TableHead>
              <TableHead>Demanda Contratada Fora Ponta (kW)</TableHead>
              <TableHead>Grupo/Subgrupo</TableHead>
              <TableHead>Modalidade Tarifária</TableHead>
              <TableHead>Distribuidora</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consumerUnits.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell>{unit.empresa}</TableCell>
                <TableCell>{unit.nome}</TableCell>
                <TableCell>{unit.numero}</TableCell>
                <TableCell>{unit.endereco}</TableCell>
                {renderDemandaContratada(unit)}
                <TableCell>{unit.grupoSubgrupo}</TableCell>
                <TableCell>{unit.modalidadeTarifaria}</TableCell>
                <TableCell>{unit.distribuidora}</TableCell>
                <TableCell className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setEditingConsumerUnit(unit)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Unidade Consumidora</AlertDialogTitle>
                        <AlertDialogDescription>
                          Deseja realmente excluir esta unidade consumidora? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteConsumerUnit(unit.id)}>
                          Confirmar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ConsumerUnitList;