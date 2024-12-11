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

const GeneratorUnitList = () => {
  const { generatorUnits, deleteGeneratorUnit, setEditingGeneratorUnit } = useData();
  const { isAdmin } = useAuth();
  const [filters, setFilters] = useState({
    empresa: "",
    unidadeConsumidora: "",
    tipoGeracao: "",
    potenciaInstalada: "",
    tipoConexao: "",
  });

  const filteredUnits = generatorUnits.filter(unit => {
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
    <Card>
      <CardHeader>
        <CardTitle>Lista de Unidades Geradoras</CardTitle>
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
                    placeholder="Filtrar unidade consumidora"
                    value={filters.unidadeConsumidora}
                    onChange={(e) => handleFilterChange("unidadeConsumidora", e.target.value)}
                    className="max-w-sm"
                  />
                </TableHead>
                <TableHead>
                  <Input
                    placeholder="Filtrar tipo de geração"
                    value={filters.tipoGeracao}
                    onChange={(e) => handleFilterChange("tipoGeracao", e.target.value)}
                    className="max-w-sm"
                  />
                </TableHead>
                <TableHead>
                  <Input
                    placeholder="Filtrar potência"
                    value={filters.potenciaInstalada}
                    onChange={(e) => handleFilterChange("potenciaInstalada", e.target.value)}
                    className="max-w-sm"
                  />
                </TableHead>
                <TableHead>
                  <Input
                    placeholder="Filtrar tipo de conexão"
                    value={filters.tipoConexao}
                    onChange={(e) => handleFilterChange("tipoConexao", e.target.value)}
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
                  <TableCell>{unit.unidadeConsumidora}</TableCell>
                  <TableCell>{unit.tipoGeracao}</TableCell>
                  <TableCell>{unit.potenciaInstalada}</TableCell>
                  <TableCell>{unit.tipoConexao}</TableCell>
                  {isAdmin && (
                    <TableCell className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setEditingGeneratorUnit(unit)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteGeneratorUnit(unit.id)}
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

export default GeneratorUnitList;