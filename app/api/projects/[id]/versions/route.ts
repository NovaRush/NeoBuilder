import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({
    versions: [
      {
        id: '1',
        versionNumber: 1,
        createdAt: new Date(),
        changeDescription: 'Initial generation',
      },
    ],
  });
}
