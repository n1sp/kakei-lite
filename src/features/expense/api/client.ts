import { Expense } from '@/features/expense/types';

// APIのベースURL（Java移行時にここを変更するだけ）
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

/**
 * 全ての支出データを取得
 */
export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await fetch(`${API_BASE_URL}/expenses`);

  if (!response.ok) {
    throw new Error('支出データの取得に失敗しました');
  }

  return response.json();
};

/**
 * 支出データを作成
 */
export const createExpenseApi = async (expense: Omit<Expense, 'id' | 'createdAt'>): Promise<Expense> => {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '支出データの作成に失敗しました');
  }

  return response.json();
};

/**
 * 支出データを更新
 */
export const updateExpenseApi = async (id: string, updates: Partial<Omit<Expense, 'id' | 'createdAt'>>): Promise<Expense> => {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '支出データの更新に失敗しました');
  }

  return response.json();
};

/**
 * 支出データを削除
 */
export const deleteExpenseApi = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '支出データの削除に失敗しました');
  }
};