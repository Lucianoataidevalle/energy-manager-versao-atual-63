
import { NumberInput } from "@/components/shared/NumberInput";
import { useData } from "@/contexts/DataContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ConsumptionTabProps {
  formData: any;
  setFormData: (data: any) => void;
  isGroupB: boolean;
  shouldDisablePeakFields: boolean;
}

export const ConsumptionTab = ({
  formData,
  setFormData,
  isGroupB,
  shouldDisablePeakFields,
}: ConsumptionTabProps) => {
  const { consumerUnits } = useData();
  const selectedUnit = consumerUnits.find(unit => unit.nome === formData.unidade);
  const showGenerationFields = selectedUnit?.possuiGeracao;

  return (
    <div className="space-y-6">
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Descrição</TableHead>
              <TableHead className="w-1/3 text-center">Quantidade</TableHead>
              <TableHead className="w-1/3 text-center">Valor (R$)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Consumo Fora Ponta (kWh)</TableCell>
              <TableCell>
                <NumberInput
                  value={formData.consumoForaPonta}
                  onChange={(value) => setFormData({ ...formData, consumoForaPonta: value })}
                  required
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  value={formData.custoConsumoForaPonta}
                  onChange={(value) => setFormData({ ...formData, custoConsumoForaPonta: value })}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Consumo Ponta (kWh)</TableCell>
              <TableCell>
                <NumberInput
                  value={formData.consumoPonta}
                  onChange={(value) => setFormData({ ...formData, consumoPonta: value })}
                  required
                  disabled={isGroupB}
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  value={formData.custoConsumoPonta}
                  onChange={(value) => setFormData({ ...formData, custoConsumoPonta: value })}
                  disabled={isGroupB}
                />
              </TableCell>
            </TableRow>

            {showGenerationFields && (
              <>
                <TableRow>
                  <TableCell>Energia Injetada Fora Ponta (kWh)</TableCell>
                  <TableCell>
                    <NumberInput
                      value={formData.energiaInjetadaForaPonta}
                      onChange={(value) => setFormData({ ...formData, energiaInjetadaForaPonta: value })}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <NumberInput
                      value={formData.custoEnergiaInjetadaForaPonta}
                      onChange={(value) => setFormData({ ...formData, custoEnergiaInjetadaForaPonta: value })}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Energia Injetada Ponta (kWh)</TableCell>
                  <TableCell>
                    <NumberInput
                      value={formData.energiaInjetadaPonta}
                      onChange={(value) => setFormData({ ...formData, energiaInjetadaPonta: value })}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    <NumberInput
                      value={formData.custoEnergiaInjetadaPonta}
                      onChange={(value) => setFormData({ ...formData, custoEnergiaInjetadaPonta: value })}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Saldo Acumulado (kWh)</TableCell>
                  <TableCell>
                    <NumberInput
                      value={formData.saldoAcumulado}
                      onChange={(value) => setFormData({ ...formData, saldoAcumulado: value })}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    {/* Sem campo de valor para saldo acumulado */}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Geração Total (kWh)</TableCell>
                  <TableCell>
                    <NumberInput
                      value={formData.geracaoTotal}
                      onChange={(value) => setFormData({ ...formData, geracaoTotal: value })}
                      required
                    />
                  </TableCell>
                  <TableCell>
                    {/* Sem campo de valor para geração total */}
                  </TableCell>
                </TableRow>
              </>
            )}

            <TableRow>
              <TableCell>Demanda Medida Fora Ponta (kW)</TableCell>
              <TableCell>
                <NumberInput
                  value={formData.demandaMedidaForaPonta}
                  onChange={(value) => setFormData({ ...formData, demandaMedidaForaPonta: value })}
                  required
                  disabled={isGroupB}
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  value={formData.custoDemandaMedidaForaPonta}
                  onChange={(value) => setFormData({ ...formData, custoDemandaMedidaForaPonta: value })}
                  disabled={isGroupB}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Demanda Medida Ponta (kW)</TableCell>
              <TableCell>
                <NumberInput
                  value={formData.demandaMedidaPonta}
                  onChange={(value) => setFormData({ ...formData, demandaMedidaPonta: value })}
                  required
                  disabled={isGroupB || shouldDisablePeakFields}
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  value={formData.custoDemandaMedidaPonta}
                  onChange={(value) => setFormData({ ...formData, custoDemandaMedidaPonta: value })}
                  disabled={isGroupB || shouldDisablePeakFields}
                />
              </TableCell>
            </TableRow>
            
            {/* Novo campo: Demanda de Ultrapassagem - Fora Ponta */}
            <TableRow>
              <TableCell>Demanda de Ultrapassagem - Fora Ponta (kW)</TableCell>
              <TableCell>
                <NumberInput
                  value={formData.demandaUltrapassagemForaPonta}
                  onChange={(value) => setFormData({ ...formData, demandaUltrapassagemForaPonta: value })}
                  disabled={isGroupB}
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  value={formData.custoDemandaUltrapassagemForaPonta}
                  onChange={(value) => setFormData({ ...formData, custoDemandaUltrapassagemForaPonta: value })}
                  disabled={isGroupB}
                />
              </TableCell>
            </TableRow>

            {/* Novo campo: Demanda de Ultrapassagem - Ponta */}
            <TableRow>
              <TableCell>Demanda de Ultrapassagem - Ponta (kW)</TableCell>
              <TableCell>
                <NumberInput
                  value={formData.demandaUltrapassagemPonta}
                  onChange={(value) => setFormData({ ...formData, demandaUltrapassagemPonta: value })}
                  disabled={isGroupB || shouldDisablePeakFields}
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  value={formData.custoDemandaUltrapassagemPonta}
                  onChange={(value) => setFormData({ ...formData, custoDemandaUltrapassagemPonta: value })}
                  disabled={isGroupB || shouldDisablePeakFields}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Energia Reativa Fora Ponta (kVArh)</TableCell>
              <TableCell>
                <NumberInput
                  value={formData.energiaReativaForaPonta}
                  onChange={(value) => setFormData({ ...formData, energiaReativaForaPonta: value })}
                  required
                  disabled={isGroupB}
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  value={formData.custoEnergiaReativaForaPonta}
                  onChange={(value) => setFormData({ ...formData, custoEnergiaReativaForaPonta: value })}
                  disabled={isGroupB}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Energia Reativa Ponta (kVArh)</TableCell>
              <TableCell>
                <NumberInput
                  value={formData.energiaReativaPonta}
                  onChange={(value) => setFormData({ ...formData, energiaReativaPonta: value })}
                  required
                  disabled={isGroupB}
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  value={formData.custoEnergiaReativaPonta}
                  onChange={(value) => setFormData({ ...formData, custoEnergiaReativaPonta: value })}
                  disabled={isGroupB}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Demanda Reativa Fora Ponta (kVAr)</TableCell>
              <TableCell>
                <NumberInput
                  value={formData.demandaReativaForaPonta}
                  onChange={(value) => setFormData({ ...formData, demandaReativaForaPonta: value })}
                  required
                  disabled={isGroupB}
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  value={formData.custoDemandaReativaForaPonta}
                  onChange={(value) => setFormData({ ...formData, custoDemandaReativaForaPonta: value })}
                  disabled={isGroupB}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Demanda Reativa Ponta (kVAr)</TableCell>
              <TableCell>
                <NumberInput
                  value={formData.demandaReativaPonta}
                  onChange={(value) => setFormData({ ...formData, demandaReativaPonta: value })}
                  required
                  disabled={isGroupB || shouldDisablePeakFields}
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  value={formData.custoDemandaReativaPonta}
                  onChange={(value) => setFormData({ ...formData, custoDemandaReativaPonta: value })}
                  disabled={isGroupB || shouldDisablePeakFields}
                />
              </TableCell>
            </TableRow>
            
            {/* Removed the Bandeira Tarifária row as requested */}

            <TableRow>
              <TableCell>Multas/Juros (R$)</TableCell>
              <TableCell colSpan={2}>
                <NumberInput
                  value={formData.multasJuros}
                  onChange={(value) => setFormData({ ...formData, multasJuros: value })}
                  required
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Valor Total da Fatura (R$)</TableCell>
              <TableCell colSpan={2}>
                <NumberInput
                  value={formData.valorFatura}
                  onChange={(value) => setFormData({ ...formData, valorFatura: value })}
                  required
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
