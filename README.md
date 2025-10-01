# Compliance Hub

A full-stack monorepo for customer compliance and risk management, built with modern TypeScript tooling.

## Overview

Compliance Hub is a scalable monorepo application for managing customer data, risk assessment, and compliance workflows. Built with pnpm workspaces, it includes a robust Express API backend with Prisma ORM and a React frontend with Vite.

## Project Structure

```
compliance-hub/
  pnpm-workspace.yaml
  package.json
  tsconfig.base.json
  docker-compose.yml
  Makefile
  apps/
    api/          # Express + TypeScript + Prisma
    web/          # React + Vite + TypeScript
```

## Tech Stack

### Core
- **Runtime:** Node.js 20+
- **Language:** TypeScript 5.6
- **Package Manager:** pnpm
- **Monorepo:** pnpm workspaces

### Backend
- **Framework:** Express 4.21
- **ORM:** Prisma 5.18
- **Database:** PostgreSQL 16
- **Validation:** Zod 3.23
- **Security:** Helmet + CORS

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite 5.4
- **Types:** TypeScript strict mode

### DevOps
- **Containerization:** Docker Compose
- **Formatter:** Prettier
- **Build System:** Make
- **Cache:** Redis 7 (ready for use)

## Requirements

- Node.js 20+
- pnpm
- PostgreSQL 14+ (or Docker)
- Docker (optional, for containerized deployment)

## 🚀 Quick Start

### Make Commands (Recommended)

```bash
# View all available commands
make help

# Complete initial setup
make install      # Install dependencies
make db-setup     # Configure DB (schema + seed)

# Development
make dev          # Run API + Web in parallel

# Database management
make db-studio    # Open Prisma Studio
```

### Manual Setup

```bash
# Install dependencies
pnpm i -w

# Configure database
pnpm db:push
pnpm db:seed

# Run in development
pnpm dev
```

## Services

- **API**: http://localhost:4000
- **Web**: http://localhost:5173
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## API Routes

- `GET /health` - Health check (no authentication required)
- `GET /customers` - List all customers
- `POST /customers` - Create a new customer
- `GET /cases` - List all compliance cases
- `GET /report/:id` - Generate compliance report

## Authentication

The API uses header-based authentication:
- Header: `x-api-key: dev-admin-123`
- All routes (except `/health`) require this header

Example:
```bash
curl -H "x-api-key: dev-admin-123" http://localhost:4000/customers
```

## 🛠️ DevOps & Make Commands

### Development
```bash
make dev          # Complete development (API + Web)
make dev-api      # API only
make dev-web      # Web only
make build        # Production build
```

### Database
```bash
make db-setup     # Complete setup (schema + seed)
make db-push      # Apply schema to DB
make db-seed      # Run data seed
make db-reset     # Complete DB reset (with confirmation)
make db-studio    # Open Prisma Studio
```

### Docker
```bash
make docker-up    # Start services with Docker
make docker-down  # Stop Docker services
make docker-logs  # View container logs
```

### Quality Assurance
```bash
make format       # Format code with Prettier
make format-check # Check code format
make type-check   # Verify TypeScript types
```

### Utilities
```bash
make status       # Status of all services
make logs         # View real-time logs
make clean        # Clean temporary files
make demo         # Create additional demo data
```

## Docker Deployment

Start all services with Docker Compose:

```bash
pnpm docker:up
```

This starts:
- PostgreSQL on port 5432
- Redis on port 6379
- API on port 4000
- Web on port 5173

To stop:
```bash
pnpm docker:down
```

## Database

The project uses Prisma with PostgreSQL. The seed creates sample customers with varying risk profiles for testing purposes.

### Prisma Commands

```bash
# Apply schema changes
pnpm db:push

# Run seed
pnpm db:seed

# Open Prisma Studio
npx prisma studio
```

## Architecture Highlights

- ✅ **Singleton Pattern** for Prisma Client (prevents connection pool exhaustion)
- ✅ **Centralized Error Handling** with custom error classes
- ✅ **Async Handler Wrapper** for clean route handlers
- ✅ **Structured Logger** with levels and colors
- ✅ **Environment Variables Validation** with Zod
- ✅ **Centralized Validations** in `validations/`
- ✅ **Typed API Client** in frontend
- ✅ **Complete Type Safety** (no `any` types)
- ✅ **Environment-based CORS** configuration
- ✅ **Graceful Shutdown** implemented

## Environment Variables

Create a `.env` file in `apps/api/`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/compliance_hub"
NODE_ENV="development"
PORT="4000"
ADMIN_API_KEY="dev-admin-123"
```

## Available Scripts

```bash
# Development
pnpm dev                 # Run API and Web in parallel
pnpm -C apps/api dev     # API only
pnpm -C apps/web dev     # Web only

# Database
pnpm db:push             # Push schema to DB
pnpm db:seed             # Run seed

# Docker
pnpm docker:up           # Start with Docker Compose
pnpm docker:down         # Stop Docker services

# Build
pnpm build               # Build both apps
```

## Project Status

✅ **Core Features Implemented:**
- Customer management (CRUD operations)
- Risk scoring system
- Authentication middleware
- Database with seed data
- Docker containerization
- Type-safe API client
- Centralized error handling
- DevOps automation with Make

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
