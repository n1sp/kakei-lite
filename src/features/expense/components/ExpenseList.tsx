'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Trash2Icon } from 'lucide-react';
import { formatAmount, formatDate } from '@/utils/format';
import { getExpenseCategoryLabel } from '../utils';
import { EPENSE_CATEGORY_COLORS } from '../constants';
import type { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>まだ支出が登録されていません</p>
        <p className="text-sm">支出入力画面から支出を追加してください</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense, index) => (
        <div key={expense.id}>
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{formatDate(expense.date)}</span>
                <Badge
                  className={
                    EPENSE_CATEGORY_COLORS[expense.category as keyof typeof EPENSE_CATEGORY_COLORS]
                  }
                >
                  {getExpenseCategoryLabel(expense.category)}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{formatAmount(expense.amount)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(expense.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </div>
              {expense.memo && (
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{expense.memo}</p>
              )}
            </div>
          </div>
          {index < expenses.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}