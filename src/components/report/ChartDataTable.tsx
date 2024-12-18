import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ChartDataTableProps {
  data: any[];
  columns: {
    key: string;
    label: string;
    format?: (value: any) => string;
  }[];
}

const ChartDataTable = ({ data, columns }: ChartDataTableProps) => {
  if (!data || data.length === 0) return null;

  const months = data.map(item => item.mes);
  const metrics = columns.filter(col => col.key !== 'mes');

  return (
    <div className="mt-4 border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            {months.map((month, index) => (
              <TableHead key={index} className="text-center">
                {month}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.key}>
              <TableCell className="font-medium">
                {metric.label}
              </TableCell>
              {data.map((item, index) => (
                <TableCell key={index} className="text-center">
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