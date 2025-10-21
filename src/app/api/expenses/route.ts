import { NextResponse } from 'next/server';
import { createExpense, getAllExpenses } from '@/features/expense/api/endpoint';


// GET (一覧取得)
export async function GET() {
  try {
    const expenses = await getAllExpenses()
    return NextResponse.json(expenses)
  } catch (error) {
    console.error('GET /api/expenses error:', error)
    return NextResponse.json(
      { error: '支出データの取得二失敗しました'},
      { status: 500}
    )
  }
}

// POST (新規作成)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // バリデーション
    if (!body.amount || !body.category) {
      return NextResponse.json(
        { error: '金額とカテゴリは必須です' },
        { status: 400 }
      );
    }

    const newExpense = await createExpense({
      date: body.date,
      amount: Number(body.amount),
      category: body.category,
      memo: body.memo || ''
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.error('POST /api/expenses error:', error);
    return NextResponse.json(
      { error: '支出データの作成に失敗しました' },
      { status: 500 }
    );
  }
}
