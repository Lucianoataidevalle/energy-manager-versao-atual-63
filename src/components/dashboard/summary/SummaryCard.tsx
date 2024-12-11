import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  currentValue: number;
  totalValue?: number;
  averageValue?: number;
  unit?: string;
  isCurrency?: boolean;
  subtitle?: string;
  averageLabel?: string;
  hidePercentage?: boolean;
}

const SummaryCard = ({
  title,
  currentValue,
  totalValue,
  averageValue,
  unit = "",
  isCurrency = false,
  subtitle = "Mês Atual",
  averageLabel = "Média 12 meses",
  hidePercentage = false,
}: SummaryCardProps) => {
  const formatValue = (value: number) => {
    if (isCurrency) {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
    }
    return value.toLocaleString("pt-BR", { maximumFractionDigits: 0 }) + (unit ? ` ${unit}` : "");
  };

  const calculatePercentageChange = (current: number, average: number) => {
    if (average === 0) return 0;
    return ((current - average) / average) * 100;
  };

  const renderPercentageIndicator = (current: number, average: number) => {
    if (hidePercentage) return null;
    
    const percentage = calculatePercentageChange(current, average);
    if (percentage === 0) return null;
    
    const isPositive = percentage > 0;
    const isGenerationCard = title === "Geração de Energia";
    
    // Invert colors only for "Geração de Energia" card
    const colorClasses = isGenerationCard
      ? isPositive 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
      : isPositive 
        ? 'bg-red-100 text-red-800' 
        : 'bg-green-100 text-green-800';
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-sm ${colorClasses}`}>
        {isPositive ? '+' : ''}{percentage.toFixed(1)}%
      </span>
    );
  };

  const compareValue = totalValue !== undefined ? totalValue : (averageValue || 0);

  return (
    <Card className="bg-white rounded-lg shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{formatValue(currentValue)}</p>
              {renderPercentageIndicator(currentValue, compareValue)}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{averageLabel}</p>
            <p className="text-lg font-semibold">{formatValue(compareValue)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;