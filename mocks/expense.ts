
import { Expense } from "@/types/expense";

export const mockExpenses: Expense[] = [
  { id: "1", date: "2025-08-01", amount: 1200, category: "food", memo: "ランチ（牛丼）", createdAt: Date.now() },
  { id: "2", date: "2025-08-02", amount: 5800, category: "living", memo: "スーパーで食材まとめ買い", createdAt: Date.now() },
  { id: "3", date: "2025-08-05", amount: 9800, category: "fixed", memo: "家賃の一部", createdAt: Date.now() },
  { id: "4", date: "2025-08-07", amount: 1500, category: "misc", memo: "カフェ代", createdAt: Date.now() },
]