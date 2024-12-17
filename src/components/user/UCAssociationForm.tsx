import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/contexts/DataContext";
import { toast } from "sonner";
import { userService } from "@/services/userService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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

  const handleEmpresaChange = (empresa: string, checked: boolean) => {
    const newSelectedEmpresas = checked
      ? [...selectedEmpresas, empresa]
      : selectedEmpresas.filter((e) => e !== empresa);
    
    setSelectedEmpresas(newSelectedEmpresas);
    
    // Remove unidades from deselected empresas
    const newSelectedUnidades = selectedUnidades.filter((unidade) => {
      const unit = consumerUnits.find((u) => u.numero === unidade);
      return unit && newSelectedEmpresas.includes(unit.empresa);
    });
    
    setSelectedUnidades(newSelectedUnidades);
  };

  const handleUnidadeChange = (unidade: string, checked: boolean) => {
    setSelectedUnidades(
      checked
        ? [...selectedUnidades, unidade]
        : selectedUnidades.filter((u) => u !== unidade)
    );
  };

  const handleSubmit = async () => {
    try {
      await userService.updateConsumerUnits(userId, selectedUnidades);
      onUpdate(selectedEmpresas, selectedUnidades);
      toast.success("Vínculos atualizados com sucesso!");
    } catch (error) {
      console.error('Error updating consumer units:', error);
      toast.error("Erro ao atualizar vínculos");
    }
  };

  // Sort companies alphabetically
  const sortedCompanies = [...companies].sort((a, b) => 
    a.razaoSocial.localeCompare(b.razaoSocial)
  );

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Vínculo de UCs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Accordion type="multiple" className="w-full">
            {sortedCompanies.map((company) => {
              // Get and sort consumer units for this company
              const companyUnits = consumerUnits
                .filter((uc) => uc.empresa === company.razaoSocial)
                .sort((a, b) => a.nome.localeCompare(b.nome));

              return (
                <AccordionItem value={company.id} key={company.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`company-${company.id}`}
                        checked={selectedEmpresas.includes(company.razaoSocial)}
                        onCheckedChange={(checked) => 
                          handleEmpresaChange(company.razaoSocial, checked === true)
                        }
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Label
                        htmlFor={`company-${company.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {company.razaoSocial}
                      </Label>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-6 space-y-2">
                      {companyUnits.map((unit) => (
                        <div key={unit.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`unit-${unit.id}`}
                            checked={selectedUnidades.includes(unit.numero)}
                            onCheckedChange={(checked) => 
                              handleUnidadeChange(unit.numero, checked === true)
                            }
                            disabled={!selectedEmpresas.includes(company.razaoSocial)}
                          />
                          <Label
                            htmlFor={`unit-${unit.id}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {`${unit.nome} (${unit.numero})`}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <Button onClick={handleSubmit} className="w-full">
            Atualizar Vínculos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};