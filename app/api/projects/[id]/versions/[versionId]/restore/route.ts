import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { id: string; versionId: string } }
) {
  return NextResponse.json({ success: true });
}
