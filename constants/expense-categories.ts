// Expense category definitions
export const EXPENSE_CATEGORIES = [
  { value: "food", label: "食費" },
  { value: "living", label: "生活費" },
  { value: "fixed", label: "固定費" },
  { value: "misc", label: "雑費" },
] as const;

// Expense category colors definitions
export const EPENSE_CATEGORY_COLORS = {
  food: "bg-orange-100 text-orange-800",
  living: "bg-blue-100 text-blue-800",
  fixed: "bg-purple-100 text-purple-800",
  misc: "bg-gray-100 text-gray-800",
} as const;

