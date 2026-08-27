import { slugSchema, reservedSlugs, isReservedSlug } from '@/lib/validation';

describe('Validation', () => {
  describe('slugSchema', () => {
    it('should validate correct slugs', () => {
      const result = slugSchema.safeParse('my-project');
      expect(result.success).toBe(true);
    });

    it('should reject uppercase', () => {
      const result = slugSchema.safeParse('My-Project');
      expect(result.success).toBe(false);
    });

    it('should reject spaces', () => {
      const result = slugSchema.safeParse('my project');
      expect(result.success).toBe(false);
    });
  });

  describe('isReservedSlug', () => {
    it('should detect reserved slugs', () => {
      expect(isReservedSlug('admin')).toBe(true);
      expect(isReservedSlug('api')).toBe(true);
      expect(isReservedSlug('dashboard')).toBe(true);
    });

    it('should allow non-reserved slugs', () => {
      expect(isReservedSlug('myproject')).toBe(false);
      expect(isReservedSlug('portfolio')).toBe(false);
    });
  });
});
