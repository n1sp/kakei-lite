import { NextResponse } from 'next/server';
import { deleteExpense, updateExpense } from '@/lib/expense';

// DELETE (削除)
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await deleteExpense(id);

    return NextResponse.json({
      message: '支出データを削除しました',
      id
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/expenses/[id] error:', error);
    return NextResponse.json(
      { error: '支出データの削除に失敗しました' },
      { status: 500 }
    );
  }
}

// PUT (更新)
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const updatedExpense = await updateExpense(id, {
      ...(body.date && { date: body.date }),
      ...(body.amount !== undefined && { amount: Number(body.amount) }),
      ...(body.category && { category: body.category }),
      ...(body.memo !== undefined && { memo: body.memo })
    });

    return NextResponse.json(updatedExpense, { status: 200 });
  } catch (error) {
    console.error('PUT /api/expenses/[id] error:', error);
    return NextResponse.json(
      { error: '支出データの更新に失敗しました' },
      { status: 500 }
    );
  }
}