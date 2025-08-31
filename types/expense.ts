// Expense type definition
export interface Expense {
  id: string
  date: string // YYYY-MM-DD
  amount: number
  category: string
  memo: string
  createdAt: string // ISO 8601 format: 2024-01-01T10:00:00Z
}