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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const ConsumerUnitList = () => {
  const { consumerUnits, deleteConsumerUnit, setEditingConsumerUnit } = useData();
  const { isAdmin, user } = useAuth();
  const [filters, setFilters] = useState({
    empresa: "",
    nome: "",
    numero: "",
    distribuidora: "",
    grupoSubgrupo: "",
  });

  // Filter units based on user permissions
  const userUnits = isAdmin 
    ? consumerUnits 
    : consumerUnits.filter(unit => user?.unidadesConsumidoras?.includes(unit.nome));

  const filteredUnits = userUnits.filter(unit => {
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
    <Card className="mt-12">
      <CardHeader>
        <CardTitle>Lista de Unidades Consumidoras</CardTitle>
      </CardHeader>
      <CardContent>
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
                    placeholder="Filtrar número"
                    value={filters.numero}
                    onChange={(e) => handleFilterChange("numero", e.target.value)}
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
                <TableHead>
                  <Input
                    placeholder="Filtrar grupo/subgrupo"
                    value={filters.grupoSubgrupo}
                    onChange={(e) => handleFilterChange("grupoSubgrupo", e.target.value)}
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
                  <TableCell>{unit.distribuidora}</TableCell>
                  <TableCell>{unit.grupoSubgrupo}</TableCell>
                  {isAdmin && (
                    <TableCell className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setEditingConsumerUnit(unit)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteConsumerUnit(unit.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsumerUnitList;