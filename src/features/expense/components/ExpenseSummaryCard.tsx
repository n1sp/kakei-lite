import { Card, CardContent } from '@/components/ui/card';
import { formatAmount } from '@/utils/format';

interface ExpenseSummaryCardProps {
  totalAmount: number;
}

export function ExpenseSummaryCard({ totalAmount }: ExpenseSummaryCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <p className="text-sm text-gray-600">総支出額</p>
          <p className="text-3xl font-bold text-gray-900">{formatAmount(totalAmount)}</p>
        </div>
      </CardContent>
    </Card>
  );
}