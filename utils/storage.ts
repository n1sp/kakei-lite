import { Expense } from "@/types/expense"

// localStorageにデータを保存
export const saveExpenses = (newExpenses: Expense[]) => {
    localStorage.setItem("expenses", JSON.stringify(newExpenses))
}

// localStorageからデータを読み込み
export const loadExpenses = ():Expense[] => {
    const savedExpenses = localStorage.getItem("expenses")
    if (savedExpenses) {
        try {
            return JSON.parse(savedExpenses)
        } catch {
            return []
        }
    }
    return []
}