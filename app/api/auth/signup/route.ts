import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { signUpSchema } from '@/lib/validation';
import { createSession, setSessionCookie } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = signUpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, name, password } = parsed.data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      );
    }

    // Create user
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

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
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
