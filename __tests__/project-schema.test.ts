import { validateProjectData } from '@/lib/project-schema';

describe('Project Schema Validation', () => {
  it('should accept valid project data', () => {
    const validData = {
      pages: [
        {
          name: 'Home',
          path: '/',
          sections: [
            {
              type: 'hero',
              id: 'hero-1',
              content: { title: 'Welcome' },
              style: { backgroundColor: '#fff' },
            },
          ],
        },
      ],
      theme: { colors: {}, fonts: {}, spacing: {} },
      settings: { siteName: 'Test', siteDescription: 'Test', favicon: '' },
    };

    expect(validateProjectData(validData)).toBe(true);
  });

  it('should reject invalid component types', () => {
    const invalidData = {
      pages: [
        {
          name: 'Home',
          path: '/',
          sections: [
            {
              type: 'malicious-script',
              id: 'bad-1',
              content: {},
              style: {},
            },
          ],
        },
      ],
      theme: { colors: {}, fonts: {}, spacing: {} },
      settings: { siteName: 'Test', siteDescription: 'Test', favicon: '' },
    };

    expect(validateProjectData(invalidData)).toBe(false);
  });

  it('should reject missing required fields', () => {
    const incompleteData = {
      pages: [],
      theme: {},
    };

    expect(validateProjectData(incompleteData)).toBe(false);
  });
});
