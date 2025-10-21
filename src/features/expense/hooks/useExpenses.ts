import { useState, useEffect } from 'react';
import { deleteExpenseApi, fetchExpenses } from '@/features/expense/api/client';
import { Expense } from '@/features/expense/types';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // APIからデータを読み込み
  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await fetchExpenses();
      setExpenses(data);
      setError(null);
    } catch (error) {
      console.error('Failed to load expenses:', error);
      setError('支出データの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // 初回読み込み
  useEffect(() => {
    loadExpenses();
  }, []);

  const deleteExpense = async (id: string) => {
    try {
      await deleteExpenseApi(id);
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Failed to delete expense:', error);
      alert('支出データの削除に失敗しました');
    }
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return {
    expenses,
    loading,
    error,
    totalAmount,
    deleteExpense,
    refetch: loadExpenses,
  };
}