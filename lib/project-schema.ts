// Placeholder for AI service integration
// This will be implemented in Phase 3

export interface ProjectSchema {
  pages: Page[];
  theme: Theme;
  settings: Settings;
}

export interface Page {
  name: string;
  path: string;
  sections: Section[];
}

export interface Section {
  type: string;
  id: string;
  content: Record<string, any>;
  style: Record<string, any>;
}

export interface Theme {
  colors: Record<string, string>;
  fonts: Record<string, string>;
  spacing: Record<string, string>;
}

export interface Settings {
  siteName: string;
  siteDescription: string;
  favicon: string;
}

export function validateProjectData(data: any): data is ProjectSchema {
  return (
    data &&
    typeof data === 'object' &&
    Array.isArray(data.pages) &&
    data.theme &&
    data.settings
  );
}
