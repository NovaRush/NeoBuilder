import { prisma } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';
import { signInSchema } from '@/lib/validation';
import { createSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = signInSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create session
    const token = await createSession(user.id, user.email);
    const response = NextResponse.json({ user: { id: user.id, email: user.email } });
    
    // Set cookie
    const cookieString = `auth-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`;
    if (process.env.NODE_ENV === 'production') {
      response.headers.append('Set-Cookie', cookieString + '; Secure');
    } else {
      response.headers.append('Set-Cookie', cookieString);
    }

    return response;
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
