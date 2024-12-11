import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";
import { UpdateConfirmDialog } from "../invoice/InvoiceForm/UpdateConfirmDialog";

const ConsumerUnitList = () => {
  const { consumerUnits, deleteConsumerUnit, setEditingConsumerUnit } = useData();
  const { isAdmin } = useAuth();
  const [filters, setFilters] = useState({
    empresa: "",
    nome: "",
    numero: "",
    endereco: "",
    grupoSubgrupo: "",
    modalidadeTarifaria: "",
    distribuidora: "",
  });

  const filteredUnits = consumerUnits.filter(unit => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const unitValue = unit[key as keyof typeof unit]?.toString().toLowerCase();
      return unitValue?.includes(value.toLowerCase());
    });
  });

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Input
                placeholder="Filtrar empresa"
                value={filters.empresa}
                onChange={(e) => handleFilterChange("empresa", e.target.value)}
                className="max-w-sm"
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar nome"
                value={filters.nome}
                onChange={(e) => handleFilterChange("nome", e.target.value)}
                className="max-w-sm"
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar número UC"
                value={filters.numero}
                onChange={(e) => handleFilterChange("numero", e.target.value)}
                className="max-w-sm"
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar endereço"
                value={filters.endereco}
                onChange={(e) => handleFilterChange("endereco", e.target.value)}
                className="max-w-sm"
              />
            </TableHead>
            <TableHead>Demanda Contratada Ponta (kW)</TableHead>
            <TableHead>Demanda Contratada Fora Ponta (kW)</TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar grupo/subgrupo"
                value={filters.grupoSubgrupo}
                onChange={(e) => handleFilterChange("grupoSubgrupo", e.target.value)}
                className="max-w-sm"
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar modalidade"
                value={filters.modalidadeTarifaria}
                onChange={(e) => handleFilterChange("modalidadeTarifaria", e.target.value)}
                className="max-w-sm"
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filtrar distribuidora"
                value={filters.distribuidora}
                onChange={(e) => handleFilterChange("distribuidora", e.target.value)}
                className="max-w-sm"
              />
            </TableHead>
            {isAdmin && <TableHead>Ações</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUnits.map((unit) => (
            <TableRow key={unit.id}>
              <TableCell>{unit.empresa}</TableCell>
              <TableCell>{unit.nome}</TableCell>
              <TableCell>{unit.numero}</TableCell>
              <TableCell>{unit.endereco}</TableCell>
              <TableCell>{unit.demandaContratadaPonta}</TableCell>
              <TableCell>{unit.demandaContratadaForaPonta}</TableCell>
              <TableCell>{unit.grupoSubgrupo}</TableCell>
              <TableCell>{unit.modalidadeTarifaria}</TableCell>
              <TableCell>{unit.distribuidora}</TableCell>
              {isAdmin && (
                <TableCell className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setEditingConsumerUnit(unit)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <UpdateConfirmDialog
                    onConfirm={() => deleteConsumerUnit(unit.id)}
                    isEditing={false}
                    confirmTitle="Excluir Unidade Consumidora"
                    confirmMessage="Deseja realmente excluir esta unidade consumidora? Esta ação não pode ser desfeita."
                    buttonText=""
                    buttonIcon={<Trash2 className="h-4 w-4" />}
                    buttonVariant="outline"
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConsumerUnitList;