import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/DataContext";
import { toast } from "sonner";
import { userService } from "@/services/userService";

interface UCAssociationFormProps {
  userId: string;
  currentEmpresas: string[];
  currentUnidades: string[];
  onUpdate: (empresas: string[], unidades: string[]) => void;
}

export const UCAssociationForm = ({
  userId,
  currentEmpresas,
  currentUnidades,
  onUpdate,
}: UCAssociationFormProps) => {
  const { companies, consumerUnits } = useData();
  const [selectedEmpresas, setSelectedEmpresas] = useState<string[]>(currentEmpresas);
  const [selectedUnidades, setSelectedUnidades] = useState<string[]>(currentUnidades);

  useEffect(() => {
    setSelectedEmpresas(currentEmpresas);
    setSelectedUnidades(currentUnidades);
  }, [currentEmpresas, currentUnidades]);

  const handleEmpresaChange = (empresa: string) => {
    const newSelectedEmpresas = selectedEmpresas.includes(empresa)
      ? selectedEmpresas.filter((e) => e !== empresa)
      : [...selectedEmpresas, empresa];
    
    setSelectedEmpresas(newSelectedEmpresas);
    
    // Remove unidades from deselected empresas
    const newSelectedUnidades = selectedUnidades.filter((unidade) => {
      const unit = consumerUnits.find((u) => u.numero === unidade);
      return unit && newSelectedEmpresas.includes(unit.empresa);
    });
    
    setSelectedUnidades(newSelectedUnidades);
  };

  const handleUnidadeChange = (unidade: string) => {
    setSelectedUnidades(
      selectedUnidades.includes(unidade)
        ? selectedUnidades.filter((u) => u !== unidade)
        : [...selectedUnidades, unidade]
    );
  };

  const handleSubmit = async () => {
    try {
      await userService.updateConsumerUnits(userId, selectedUnidades);
      onUpdate(selectedEmpresas, selectedUnidades);
      toast.success("Vínculos atualizados com sucesso!");
      // Clear selections after successful update
      setSelectedEmpresas([]);
      setSelectedUnidades([]);
    } catch (error) {
      console.error('Error updating consumer units:', error);
      toast.error("Erro ao atualizar vínculos");
    }
  };

  // Sort companies alphabetically
  const sortedCompanies = [...companies].sort((a, b) => 
    a.razaoSocial.localeCompare(b.razaoSocial)
  );

  // Sort consumer units alphabetically
  const sortedUnits = consumerUnits
    .filter((uc) => selectedEmpresas.includes(uc.empresa))
    .sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Vínculo de UCs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Empresas</label>
            <div className="grid grid-cols-2 gap-2">
              {sortedCompanies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center space-x-2 p-2 border rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedEmpresas.includes(company.razaoSocial)}
                    onChange={() => handleEmpresaChange(company.razaoSocial)}
                    className="rounded border-gray-300"
                  />
                  <span>{company.razaoSocial}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Unidades Consumidoras
            </label>
            <div className="grid grid-cols-2 gap-2">
              {sortedUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="flex items-center space-x-2 p-2 border rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedUnidades.includes(unit.numero)}
                    onChange={() => handleUnidadeChange(unit.numero)}
                    className="rounded border-gray-300"
                  />
                  <span>{`${unit.nome} (${unit.numero})`}</span>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Atualizar Vínculos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};