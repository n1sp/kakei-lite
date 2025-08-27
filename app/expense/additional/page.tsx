"use client"

import type React from "react"

import { useState} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, PlusIcon} from "lucide-react"
import { Expense } from "@/types/expense"
import { EXPENSE_CATEGORIES } from "@/constants/expense-categories"

export default function ExpenseInputForm() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "",
    memo: "",
  })

  // localStorageにデータを保存
  const saveToLocalStorage = (newExpenses: Expense[]) => {
    localStorage.setItem("expenses", JSON.stringify(newExpenses))
  }

  // 支出を追加
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.amount || !formData.category) {
      alert("金額とカテゴリは必須です")
      return
    }
    const newExpense: Expense = {
      id: Date.now().toString(),
      date: formData.date,
      amount: Number.parseFloat(formData.amount),
      category: formData.category,
      memo: formData.memo,
      createdAt: Date.now(),
    }
    const updatedExpenses = [newExpense, ...expenses]
    setExpenses(updatedExpenses)
    saveToLocalStorage(updatedExpenses)

    // フォームをリセット（日付は今日のまま）
    setFormData({
      date: new Date().toISOString().split("T")[0],
      amount: "",
      category: "",
      memo: "",
    })
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">支出入力</h1>
          <p className="text-gray-600 mt-2">日々の支出を入力しましょう</p>
        </div>

        {/* 支出入力フォーム */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusIcon className="w-5 h-5" />
              支出を追加
            </CardTitle>
            <CardDescription>新しい支出を入力してください</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    日付
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">金額 *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="1000"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    min="0"
                    step="1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">カテゴリ *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリを選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPENSE_CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="memo">メモ（任意）</Label>
                <Textarea
                  id="memo"
                  placeholder="支出の詳細やメモを入力..."
                  value={formData.memo}
                  onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                <PlusIcon className="w-4 h-4 mr-2" />
                支出を追加
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}