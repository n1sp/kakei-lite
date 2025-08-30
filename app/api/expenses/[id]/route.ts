import { NextResponse } from 'next/server';
import { mockExpenses } from '@/mocks/expense';

// DELETE (削除)
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  console.log("削除走るよー")
  const index = mockExpenses.findIndex(e => e.id === id);
  if (index !== -1) mockExpenses.splice(index, 1);

  return NextResponse.json({ data: mockExpenses }, { status: 200 });
}