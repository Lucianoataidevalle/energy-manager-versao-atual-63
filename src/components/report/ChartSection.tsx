import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ChartDataTable from './ChartDataTable';
import ChartCommentBox from './ChartCommentBox';

interface ChartSectionProps {
  chartId: string;
  chartComponent: React.ReactNode;
  data: any[];
  columns: {
    key: string;
    label: string;
    format?: (value: any) => string;
  }[];
  selectedCompany: string;
  selectedUnit: string;
}

const ChartSection = ({ 
  chartId, 
  chartComponent, 
  data, 
  columns,
  selectedCompany,
  selectedUnit 
}: ChartSectionProps) => {
  return (
    <div className="chart-section space-y-4">
      <Card>
        <CardContent className="pt-6">
          {chartComponent}
          <ChartDataTable 
            data={data} 
            columns={columns} 
            selectedCompany={selectedCompany}
            selectedUnit={selectedUnit}
            chartId={chartId}
          />
        </CardContent>
      </Card>
      <ChartCommentBox chartId={chartId} />
    </div>
  );
};

export default ChartSection;