
import { TableCell, TableRow } from "@/components/ui/table";
import InvoiceList from "../InvoiceList";

interface CostsTabProps {
  formData: any;
  setFormData: (data: any) => void;
  isGroupB: boolean;
  shouldDisablePeakFields: boolean;
  selectedCompany: string;
  selectedUnit: string;
  onEditInvoice: () => void;
}

export function CostsTab({
  selectedCompany,
  selectedUnit,
  onEditInvoice
}: CostsTabProps) {
  return (
    <div className="mt-4 space-y-4">
      {selectedCompany && selectedUnit ? (
        <InvoiceList 
          selectedCompany={selectedCompany} 
          selectedUnit={selectedUnit}
          onEditInvoice={onEditInvoice}
        />
      ) : (
        <div className="text-center text-muted-foreground py-8">
          Selecione uma empresa e unidade consumidora para visualizar o histórico de faturas
        </div>
      )}
    </div>
  );
}
