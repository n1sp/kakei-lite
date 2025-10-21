import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { getExpenseCategoryLabel } from '../utils';
import { EPENSE_CATEGORY_COLORS } from '../constants';
import type { Expense } from '../types';

export const expenseColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: 'date',
    header: '日付',
  },
  {
    accessorKey: 'amount',
    header: '金額',
  },
  {
    accessorKey: 'category',
    header: 'カテゴリ',
    cell: ({ row }) => {
      return (
        <Badge
          className={
            EPENSE_CATEGORY_COLORS[row.original.category as keyof typeof EPENSE_CATEGORY_COLORS]
          }
        >
          {getExpenseCategoryLabel(row.original.category)}
        </Badge>
      );
    },
  },
];