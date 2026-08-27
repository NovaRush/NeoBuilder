import { ProjectSchema, Page, Section, Theme, Settings } from './project-schema';

export function validateProjectData(data: any): data is ProjectSchema {
  if (!data || typeof data !== 'object') return false;

  if (!Array.isArray(data.pages)) return false;
  if (!data.pages.every((p: any) => validatePage(p))) return false;

  if (!data.theme || typeof data.theme !== 'object') return false;
  if (!data.settings || typeof data.settings !== 'object') return false;

  return true;
}

function validatePage(page: any): page is Page {
  if (!page || typeof page !== 'object') return false;
  if (typeof page.name !== 'string') return false;
  if (typeof page.path !== 'string') return false;
  if (!Array.isArray(page.sections)) return false;

  return page.sections.every((s: any) => validateSection(s));
}

function validateSection(section: any): section is Section {
  if (!section || typeof section !== 'object') return false;
  if (typeof section.type !== 'string') return false;
  if (typeof section.id !== 'string') return false;
  if (typeof section.content !== 'object') return false;
  if (typeof section.style !== 'object') return false;

  // Whitelist allowed component types
  const allowedTypes = [
    'hero',
    'text',
    'image',
    'button',
    'card',
    'featureGrid',
    'gallery',
    'testimonials',
    'pricing',
    'contact',
    'footer',
    'navbar',
  ];

  return allowedTypes.includes(section.type);
}

export { validateProjectData };
