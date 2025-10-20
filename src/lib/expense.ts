import { supabase } from '@/lib/supabaseClient';
import { Expense } from '@/types/expense';

// Supabaseのテーブル名（実際のテーブル名に合わせて変更）
const TABLE_NAME = 'expenses';

/**
 * 全ての支出データを取得
 */
export const getAllExpenses = async (): Promise<Expense[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching expenses:', error);
    throw new Error('支出データの取得に失敗しました');
  }

  // Supabaseのレスポンスを型に合わせて変換
  return data?.map(item => ({
    id: item.id,
    date: item.date,
    amount: item.amount,
    category: item.category,
    memo: item.memo || '',
    createdAt: item.created_at // ISO文字列をそのまま使用
  })) || [];
};

/**
 * 支出データを作成
 */
export const createExpense = async (expense: Omit<Expense, 'id' | 'createdAt'>): Promise<Expense> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{
      date: expense.date,
      amount: expense.amount,
      category: expense.category,
      memo: expense.memo,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating expense:', error);
    throw new Error('支出データの作成に失敗しました');
  }

  return {
    id: data.id,
    date: data.date,
    amount: data.amount,
    category: data.category,
    memo: data.memo || '',
    createdAt: data.created_at // ISO文字列をそのまま使用
  };
};

/**
 * 支出データを更新
 */
export const updateExpense = async (id: string, updates: Partial<Omit<Expense, 'id' | 'createdAt'>>): Promise<Expense> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({
      ...(updates.date && { date: updates.date }),
      ...(updates.amount !== undefined && { amount: updates.amount }),
      ...(updates.category && { category: updates.category }),
      ...(updates.memo !== undefined && { memo: updates.memo }),
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating expense:', error);
    throw new Error('支出データの更新に失敗しました');
  }

  return {
    id: data.id,
    date: data.date,
    amount: data.amount,
    category: data.category,
    memo: data.memo || '',
    createdAt: data.created_at // ISO文字列をそのまま使用
  };
};

/**
 * 支出データを削除
 */
export const deleteExpense = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting expense:', error);
    throw new Error('支出データの削除に失敗しました');
  }
};