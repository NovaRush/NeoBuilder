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
- **Authentication**: JWT-based sessions
- **AI**: Configurable AI API

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

3. Create a `.env.local` file:

```bash
cp .env.example .env.local
```

4. Configure environment variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/neobuilder"
AI_API_KEY="your-ai-api-key"
AUTH_SECRET="your-secret-key-min-32-chars"
NEXTAUTH_SECRET="your-nextauth-secret-min-32-chars"
MAIN_DOMAIN="localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
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

3. (Optional) Open Prisma Studio:

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
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Auth pages (signin, signup)
│   ├── dashboard/         # Dashboard page
│   ├── projects/          # Project pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── lib/                   # Utility functions
│   ├── auth.ts            # Authentication helpers
│   ├── db.ts              # Prisma client
│   ├── session.ts         # Session management
│   └── validation.ts      # Zod schemas
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets
└── package.json
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `AI_API_KEY`: API key for AI service (e.g., OpenAI)
- `AUTH_SECRET`: Secret for JWT signing (min 32 chars)
- `NEXTAUTH_SECRET`: Next.js auth secret (min 32 chars)
- `MAIN_DOMAIN`: Your main domain for published sites (e.g., example.com)
- `NEXTAUTH_URL`: Your app URL

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create account
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/logout` - Sign out

### Projects

- `POST /api/projects` - Create project
- `GET /api/projects` - List user's projects
- `GET /api/projects/[id]` - Get project
- `PATCH /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Project Operations

- `POST /api/projects/[id]/generate` - AI generate website
- `POST /api/projects/[id]/edit` - AI edit website
- `POST /api/projects/[id]/publish` - Publish website
- `POST /api/projects/[id]/unpublish` - Unpublish website
- `GET /api/projects/[id]/versions` - Get version history
- `POST /api/projects/[id]/versions/[versionId]/restore` - Restore version

## Cloudflare DNS Setup

To use custom subdomains for published projects:

1. Add DNS records in Cloudflare:
   - `A` record: `example.com` → Your server IP
   - `A` record: `*.example.com` → Your server IP

2. Set `MAIN_DOMAIN` to your domain (e.g., `example.com`)

3. Applications deployed to subdomains will automatically route through the same server

## Development

### Type Checking

```bash
npm run type-check
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Security Notes

- All secrets should be stored in environment variables
- Session tokens are HTTP-only cookies
- Project ownership is verified server-side
- AI-generated content is validated before storage
- No arbitrary code execution from AI output
- All API endpoints require authentication

## Production Deployment

1. Set all environment variables
2. Build the application: `npm run build`
3. Start the server: `npm start`
4. Configure Cloudflare with wildcard DNS
5. Use a reverse proxy (nginx, Cloudflare) for SSL/TLS

## License

MIT

## Support

For issues and questions, please open a GitHub issue.
