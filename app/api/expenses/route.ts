import { NextResponse } from 'next/server';
import { mockExpenses } from '@/mocks/expense';


// GET (一覧取得)
export async function GET() {
  return NextResponse.json(mockExpenses);
}

// POST (新規作成)
export async function POST(request: Request) {
  const body = await request.json();
  const newExpense = { id: Date.now(), ...body };
  mockExpenses.push(newExpense);
return NextResponse.json(newExpense, { status: 201 });
}
