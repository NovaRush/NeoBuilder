// Update project-schema.ts to export validation
import { validateProjectData as validate } from './project-schema-validator';

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
  return validate(data);
}
