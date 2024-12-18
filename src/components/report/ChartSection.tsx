import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ChartDataTable from "./ChartDataTable";
import ChartCommentBox from "./ChartCommentBox";

interface ChartSectionProps {
  chartId: string;
  chartComponent: React.ReactNode;
  data: any[];
  columns: {
    key: string;
    label: string;
    format?: (value: any) => string;
  }[];
}

const ChartSection = ({ chartId, chartComponent, data, columns }: ChartSectionProps) => {
  return (
    <Card className="p-6 space-y-4">
      <CardContent className="space-y-6 p-0">
        {chartComponent}
        <ChartDataTable data={data} columns={columns} />
        <ChartCommentBox chartId={chartId} />
      </CardContent>
    </Card>
  );
};

export default ChartSection;