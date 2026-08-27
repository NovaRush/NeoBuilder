# NeoBuilder - Phase 3 Complete

AI-powered no-code website builder. Describe what you want. AI builds it for you.

## Phases Complete

- ✅ **Phase 1**: Authentication, database, landing page, dashboard
- ✅ **Phase 2**: Project creation, persistence, settings, CRUD API
- ✅ **Phase 3**: AI generation, component system, live preview
- ⏳ **Phase 4**: AI editing, chat history, version history
- ⏳ **Phase 5**: Publishing, subdomain routing
- ⏳ **Phase 6**: Security hardening, testing, UI polish

## What's New in Phase 3

### AI Generation

- `POST /api/projects/[id]/generate` - Generates website from prompt
- Integrates with OpenAI GPT-4 (configurable)
- Validates AI output before storing
- Creates version 1 automatically
- Handles generation failures gracefully

### Component System

Supported components:
- `navbar` - Navigation header
- `hero` - Hero section with CTA
- `text` - Text content sections
- `image` - Image display
- `card` - Card component
- `featureGrid` - Feature showcase grid
- `gallery` - Image gallery
- `testimonials` - Testimonials section
- `pricing` - Pricing plans
- `contact` - Contact form
- `footer` - Footer

### Live Preview

- Real-time preview of generated website
- Device preview: Desktop, Tablet, Mobile
- Responsive rendering
- Live updates as project data changes

### Project Schema

```typescript
{
  pages: [
    {
      name: "Home",
      path: "/",
      sections: [
        {
          type: "hero",
          id: "hero-1",
          content: { ... },
          style: { ... }
        }
      ]
    }
  ],
  theme: {
    colors: { ... },
    fonts: { ... },
    spacing: { ... }
  },
  settings: {
    siteName: "...",
    siteDescription: "...",
    favicon: ""
  }
}
```

## Features

- 🤖 AI-powered website generation
- 🎨 Live preview editor
- 📱 Responsive design
- 📦 Component-based architecture
- 🔒 Secure authentication
- 💾 PostgreSQL database
- ⚡ Next.js 14 + TypeScript

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, TypeScript
- **Database**: PostgreSQL, Prisma ORM
- **AI**: OpenAI GPT-4 (configurable)
- **Authentication**: JWT-based sessions

## Installation & Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Configure .env.local
DATABASE_URL="postgresql://..."
AI_API_KEY="sk-..."
AUTH_SECRET="min-32-chars-secret"
NEXTAUTH_SECRET="min-32-chars-secret"
MAIN_DOMAIN="localhost:3000"
NEXT_PUBLIC_MAIN_DOMAIN="localhost:3000"

# Setup database
creatdb neobuilder
npm run prisma:migrate

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Workflow

1. User signs up → Creates account
2. Navigates to dashboard → Views projects
3. Creates new project → Enters name & description
4. Provides AI prompt → "Build me a portfolio website..."
5. AI generates → Website structure created
6. Live preview shows → Real-time rendering
7. Next phase: Edit via chat, publish to domain

## API Endpoints

### Authentication
- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `POST /api/auth/logout`

### Projects
- `POST /api/projects` - Create
- `GET /api/projects` - List
- `GET /api/projects/[id]` - Get
- `PATCH /api/projects/[id]` - Update
- `DELETE /api/projects/[id]` - Delete
- `POST /api/projects/[id]/generate` - Generate with AI

### Coming in Phase 4
- `POST /api/projects/[id]/edit` - AI edit
- `GET /api/projects/[id]/versions` - Version history
- `POST /api/projects/[id]/versions/[versionId]/restore` - Restore version

### Coming in Phase 5
- `POST /api/projects/[id]/publish` - Publish
- `POST /api/projects/[id]/unpublish` - Unpublish

## Security

✅ Server-side authorization on all endpoints
✅ Project ownership verification
✅ AI output validation before storage
✅ No arbitrary code execution
✅ No secrets in frontend
✅ HTTP-only cookies
✅ Input validation with Zod

## Files Created in Phase 3

- `lib/ai-service.ts` - OpenAI integration
- `lib/project-schema.ts` - Data schema definition
- `lib/project-schema-validator.ts` - Schema validation
- `components/ComponentRenderer.tsx` - Component rendering engine
- `components/LivePreview.tsx` - Live preview UI
- `app/api/projects/[id]/generate/route.ts` - Generation endpoint
- `app/projects/[projectId]/page.tsx` - Builder page (updated)
- `__tests__/project-schema.test.ts` - Schema validation tests

## Next Steps (Phase 4)

- AI chat for editing
- Version history UI
- Version restoration
- Conversation context for edits
- Change descriptions

## License

MIT
