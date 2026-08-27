// AI service integration for website generation
import { ProjectSchema, Page, Section, Theme, Settings } from './project-schema';

const AI_API_KEY = process.env.AI_API_KEY;
const AI_MODEL = process.env.AI_MODEL || 'gpt-4';

if (!AI_API_KEY) {
  console.warn('AI_API_KEY not configured. AI generation will not work.');
}

const systemPrompt = `You are an expert web designer and developer. You generate website designs as JSON.

Return ONLY valid JSON (no markdown, no code blocks) matching this structure:
{
  "pages": [
    {
      "name": "Home",
      "path": "/",
      "sections": [
        {
          "type": "hero",
          "id": "hero-1",
          "content": {
            "title": "...",
            "subtitle": "...",
            "ctaText": "...",
            "imageUrl": ""
          },
          "style": {
            "backgroundColor": "#ffffff",
            "textColor": "#000000"
          }
        }
      ]
    }
  ],
  "theme": {
    "colors": {
      "primary": "#3B82F6",
      "secondary": "#1F2937",
      "accent": "#F59E0B",
      "background": "#FFFFFF",
      "text": "#000000"
    },
    "fonts": {
      "heading": "Inter",
      "body": "Inter"
    },
    "spacing": {
      "small": "0.5rem",
      "medium": "1rem",
      "large": "2rem"
    }
  },
  "settings": {
    "siteName": "My Website",
    "siteDescription": "Description",
    "favicon": ""
  }
}

Supported component types: hero, text, image, button, card, featureGrid, gallery, testimonials, pricing, contact, footer, navbar.

Generate a complete, ready-to-use website design based on the user's description.`;

export async function generateWebsite(prompt: string): Promise<ProjectSchema> {
  if (!AI_API_KEY) {
    throw new Error('AI service not configured');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: `Generate a website with this description: ${prompt}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`AI API error: ${error.error?.message}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI');
    }

    // Parse JSON response
    const projectData = JSON.parse(content);
    return projectData as ProjectSchema;
  } catch (error) {
    console.error('AI generation error:', error);
    throw error;
  }
}

export async function editWebsite(
  currentData: ProjectSchema,
  editPrompt: string
): Promise<ProjectSchema> {
  if (!AI_API_KEY) {
    throw new Error('AI service not configured');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: `Here is the current website design:\n${JSON.stringify(currentData, null, 2)}\n\nMake this modification: ${editPrompt}\n\nReturn the complete updated design.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`AI API error: ${error.error?.message}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI');
    }

    const projectData = JSON.parse(content);
    return projectData as ProjectSchema;
  } catch (error) {
    console.error('AI edit error:', error);
    throw error;
  }
}
