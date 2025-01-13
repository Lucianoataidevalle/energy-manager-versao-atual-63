import { Card, CardContent } from "@/components/ui/card";
import ChartDataTable from "./ChartDataTable";
import ChartCommentBox from "./ChartCommentBox";
import { getChartConfigurations } from "./ChartConfigurations";

interface ChartSectionProps {
  chartId: string;
  chartComponent: React.ReactNode;
  data: any[];
  columns: any[];
}

const ChartSection = ({ chartId, chartComponent, data, columns }: ChartSectionProps) => {
  const configurations = getChartConfigurations();
  const chartConfig = configurations[chartId as keyof typeof configurations];

  return (
    <Card className="chart-section">
      <CardContent className="space-y-4">
        {chartComponent}
        <ChartDataTable data={data} columns={columns} />
        <ChartCommentBox chartId={chartId} title={chartConfig.title} />
      </CardContent>
    </Card>
  );
};

export default ChartSection;