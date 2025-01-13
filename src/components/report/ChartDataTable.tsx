import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useData } from "@/contexts/DataContext";

interface ChartDataTableProps {
  data: any[];
  columns: {
    key: string;
    label: string;
    format?: (value: any) => string;
  }[];
  selectedCompany: string;
  selectedUnit: string;
  chartId?: string;
}

const ChartDataTable = ({ data, columns, selectedCompany, selectedUnit, chartId }: ChartDataTableProps) => {
  const { consumerUnits } = useData();
  
  if (!data || data.length === 0) return null;

  const months = data.map(item => item.mes);
  let metrics = columns.filter(col => col.key !== 'mes');

  // Modify labels and filter metrics for demand chart based on tariff type
  if (chartId === 'demand') {
    const unit = consumerUnits.find(
      unit => unit.empresa === selectedCompany && unit.nome === selectedUnit
    );
    const isGreenTariff = unit?.modalidadeTarifaria === 'Verde';

    if (isGreenTariff) {
      metrics = metrics.filter(metric => metric.key !== 'demandaMedidaPonta');
      metrics = metrics.map(metric => {
        if (metric.key === 'demandaMedidaForaPonta') {
          return { ...metric, label: 'Demanda Medida (kW)' };
        }
        return metric;
      });
    }
  }

  return (
    <div className="mt-4 border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-white"></TableHead>
            {months.map((month, index) => (
              <TableHead key={index} className="text-center bg-white">
                {month}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.key}>
              <TableCell className="font-medium bg-white">
                {metric.label}
              </TableCell>
              {data.map((item, index) => (
                <TableCell key={index} className="text-center bg-white">
                  {metric.format ? metric.format(item[metric.key]) : item[metric.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ChartDataTable;