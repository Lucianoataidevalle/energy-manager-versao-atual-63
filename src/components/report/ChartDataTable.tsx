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

  return (
    <div className="mt-4 border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.format ? column.format(row[column.key]) : row[column.key]}
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