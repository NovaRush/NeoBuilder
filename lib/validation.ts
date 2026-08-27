import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100),
  description: z.string().max(500).optional(),
  prompt: z.string().min(10, 'Description must be at least 10 characters').max(2000),
});

export const slugSchema = z.string()
  .min(3, 'Slug must be at least 3 characters')
  .max(63, 'Slug must be at most 63 characters')
  .regex(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/, 'Slug can only contain lowercase letters, numbers, and hyphens');

export const reservedSlugs = [
  'www', 'app', 'builder', 'admin', 'api', 'dashboard',
  'login', 'signup', 'help', 'support', 'docs', 'status'
];

export function isReservedSlug(slug: string): boolean {
  return reservedSlugs.includes(slug.toLowerCase());
}

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
