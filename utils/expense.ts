import { EXPENSE_CATEGORIES } from "@/constants/expense-categories"

// 支出カテゴリ名を取得
export const getExpenseCategoryLabel = (value: string) => {
  return EXPENSE_CATEGORIES.find((cat) => cat.value === value)?.label || value
}
