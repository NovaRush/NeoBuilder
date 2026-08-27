# NeoBuilder

AI-powered no-code website builder. Describe what you want. AI builds it for you.

## Features

- 🤖 AI-powered website generation
- 🎨 Live preview editor
- 📱 Responsive design
- 🔄 Version history
- 🌐 Custom subdomain publishing
- 🔐 Secure authentication
- 💾 PostgreSQL database
- ⚡ Next.js 14 + TypeScript

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, TypeScript
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: JWT-based sessions with HTTP-only cookies
- **AI**: Configurable AI API (OpenAI, Claude, etc.)
- **Testing**: Jest + React Testing Library

## Prerequisites

- Node.js 18+
- PostgreSQL 13+
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/NovaRush/NeoBuilder.git
cd NeoBuilder
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file from `.env.example`:

```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/neobuilder"

# Authentication
AUTH_SECRET="generate-a-random-secret-min-32-chars"
NEXTAUTH_SECRET="generate-another-random-secret-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# AI Service
AI_API_KEY="your-openai-or-claude-api-key"

# Domain Configuration
MAIN_DOMAIN="localhost:3000"
NEXT_PUBLIC_MAIN_DOMAIN="localhost:3000"
```

## Database Setup

1. Create PostgreSQL database:

```bash
creatdb neobuilder
```

2. Run Prisma migrations:

```bash
npm run prisma:migrate
```

3. (Optional) Open Prisma Studio to view database:

```bash
npm run prisma:studio
```

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── health/          # Health check
│   │   └── projects/        # Project CRUD operations
│   ├── auth/                # Authentication pages
│   │   ├── signin/          # Sign in page
│   │   └── signup/          # Sign up page
│   ├── dashboard/           # Dashboard page
│   ├── projects/            # Project pages
│   │   ├── new/             # Create project
│   │   ├── [projectId]/     # Project builder
│   │   └── [projectId]/settings/  # Project settings
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── lib/                      # Utility functions
│   ├── auth.ts              # Password hashing & verification
│   ├── db.ts                # Prisma client
│   ├── project-schema.ts    # Project data schema
│   ├── session.ts           # Session & JWT management
│   └── validation.ts        # Zod schemas & validation
├── prisma/
│   └── schema.prisma        # Database schema
├── __tests__/               # Tests
├── middleware.ts            # Route protection middleware
├── jest.config.js           # Jest configuration
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create account
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/logout` - Sign out

### Projects (CRUD)

- `POST /api/projects` - Create project
- `GET /api/projects` - List user's projects
- `GET /api/projects/[id]` - Get project details
- `PATCH /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Project Operations

- `POST /api/projects/[id]/generate` - AI generate website (Phase 3)
- `POST /api/projects/[id]/edit` - AI edit website (Phase 4)
- `POST /api/projects/[id]/publish` - Publish website (Phase 5)
- `POST /api/projects/[id]/unpublish` - Unpublish website (Phase 5)
- `GET /api/projects/[id]/versions` - Get version history (Phase 4)
- `POST /api/projects/[id]/versions/[versionId]/restore` - Restore version (Phase 4)

### System

- `GET /api/health` - Health check

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `AI_API_KEY` - API key for AI service (OpenAI, Claude, etc.)
- `AUTH_SECRET` - Secret for JWT signing (min 32 chars)
- `NEXTAUTH_SECRET` - Next.js auth secret (min 32 chars)
- `MAIN_DOMAIN` - Your main domain for published sites
- `NEXT_PUBLIC_MAIN_DOMAIN` - Public domain for frontend
- `NEXTAUTH_URL` - Your app URL

## Security Features

- ✅ Server-side authentication verification
- ✅ HTTP-only secure cookies
- ✅ Project ownership validation
- ✅ Input validation with Zod
- ✅ AI output validation
- ✅ No secrets exposed to browser
- ✅ Protected API endpoints
- ✅ Route protection middleware

## Development

### Type Checking

```bash
npm run type-check
```

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Cloudflare DNS Setup

To use custom subdomains for published projects:

1. In Cloudflare DNS, add:
   - Type: `A`, Name: `example.com`, Content: `YOUR_SERVER_IP`
   - Type: `A`, Name: `*.example.com`, Content: `YOUR_SERVER_IP`

2. Set environment variables:
   - `MAIN_DOMAIN="example.com"`
   - `NEXT_PUBLIC_MAIN_DOMAIN="example.com"`

3. All subdomains will automatically route to your application

## Phases

- ✅ **Phase 1**: Project initialization, authentication, landing page, dashboard
- ✅ **Phase 2**: Project creation, persistence, settings
- ⏳ **Phase 3**: AI generation, preview rendering, component system
- ⏳ **Phase 4**: AI editing, chat, version history
- ⏳ **Phase 5**: Publishing, subdomain routing
- ⏳ **Phase 6**: Security hardening, testing, UI polish

## Production Deployment

1. Set all environment variables
2. Build: `npm run build`
3. Start: `npm start`
4. Configure Cloudflare with wildcard DNS
5. Use reverse proxy for SSL/TLS

## License

MIT

## Support

For issues, please open a GitHub issue.
