import { formatNumber } from '@/utils/formatters';

export const getChartConfigurations = () => ({
  consumption: {
    columns: [
      { key: "mes", label: "Mês" },
      { key: "ponta", label: "Ponta (kWh)", format: formatNumber },
      { key: "foraPonta", label: "Fora Ponta (kWh)", format: formatNumber },
      { key: "total", label: "Total (kWh)", format: formatNumber }
    ]
  },
  demand: {
    columns: [
      { key: "mes", label: "Mês" },
      { key: "demandaMedidaPonta", label: "Demanda Medida Ponta (kW)", format: formatNumber },
      { key: "demandaMedidaForaPonta", label: "Demanda Medida Fora Ponta (kW)", format: formatNumber }
    ]
  },
  generation: {
    columns: [
      { key: "mes", label: "Mês" },
      { key: "geracaoTotal", label: "Geração Total (kWh)", format: formatNumber },
      { key: "estimativaGeracao", label: "Estimativa de Geração (kWh)", format: formatNumber }
    ]
  },
  billing: {
    columns: [
      { key: "mes", label: "Mês" },
      { key: "valor", label: "Valor (R$)", format: formatNumber }
    ]
  },
  reactiveEnergy: {
    columns: [
      { key: "mes", label: "Mês" },
      { key: "ponta", label: "Energia Reativa Ponta (kVArh)", format: formatNumber },
      { key: "foraPonta", label: "Energia Reativa Fora Ponta (kVArh)", format: formatNumber },
      { key: "total", label: "Total (kVArh)", format: formatNumber }
    ]
  },
  reactiveDemand: {
    columns: [
      { key: "mes", label: "Mês" },
      { key: "demandaReativaPonta", label: "Demanda Reativa Ponta (kVAr)", format: formatNumber },
      { key: "demandaReativaForaPonta", label: "Demanda Reativa Fora Ponta (kVAr)", format: formatNumber }
    ]
  },
  fines: {
    columns: [
      { key: "mes", label: "Mês" },
      { key: "valor", label: "Multas/Juros (R$)", format: formatNumber }
    ]
  }
});