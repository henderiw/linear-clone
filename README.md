# Linear Clone

A simplified Linear-inspired issue tracker built with React, TypeScript, Express, and PostgreSQL.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React + Vite   │────▶│  Express (TS)   │────▶│   PostgreSQL    │
│   Port: 5173     │     │  Port: 3001     │     │   Port: 5432    │
│                  │     │                  │     │                  │
│  - Team View     │     │  REST API:       │     │  Tables:         │
│  - Issue Detail  │     │  GET /api/issues │     │  - issues        │
│  - Create Modal  │     │  POST /api/issues│     │  - id_counter    │
│                  │     │  PATCH /api/...  │     │                  │
│                  │     │  DELETE /api/... │     │                  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Frontend (`/frontend`)

- **Vite + React 19 + TypeScript** single-page app
- Component-based architecture: `Sidebar`, `TeamView`, `IssueDetail`, `CreateIssueModal`
- CSS custom properties for theming (dark mode, Linear-inspired color palette)
- Vite dev server proxies `/api/*` to the backend

### Backend (`/backend`)

- **Express + TypeScript** REST API using `tsx` for dev
- Full CRUD endpoints at `/api/issues` and `/api/issues/:identifier`
- Auto-generates sequential identifiers (SAN-1, SAN-2, ...)
- Seeds sample data on first run
- Uses `pg` client for PostgreSQL

### Database

- **PostgreSQL 16** with two tables:
  - `issues` — stores all issue data (title, description, status, priority, etc.)
  - `id_counter` — tracks the next identifier number per team prefix

## Running with Docker Compose

### Prerequisites

- Docker and Docker Compose installed

### Quick Start

```bash
docker compose up -d --build
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Configuration

All ports and database credentials are configurable via environment variables. Copy the example:

```bash
cp .env.example .env
```

Edit `.env` to change ports or database settings:

```env
FRONTEND_PORT=5173
BACKEND_PORT=3001
DB_PORT=5432
DB_NAME=linearclone
DB_USER=postgres
DB_PASSWORD=postgres
```

### Running Multiple Instances

To run multiple dev containers simultaneously without port conflicts, use different `.env` files or pass variables inline:

**Instance 1** (default ports):
```bash
docker compose up -d --build
```

**Instance 2** (custom ports):
```bash
FRONTEND_PORT=5174 BACKEND_PORT=3002 DB_PORT=5433 \
  docker compose -p linear-clone-2 up -d --build
```

**Instance 3**:
```bash
FRONTEND_PORT=5175 BACKEND_PORT=3003 DB_PORT=5434 \
  docker compose -p linear-clone-3 up -d --build
```

The `-p` flag sets a unique project name so Docker Compose creates separate networks and volumes for each instance.

### Stopping

```bash
docker compose down          # Stop and remove containers
docker compose down -v       # Also remove the database volume
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/issues` | List all issues |
| `GET` | `/api/issues/:id` | Get issue by identifier |
| `POST` | `/api/issues` | Create a new issue |
| `PATCH` | `/api/issues/:id` | Update an issue |
| `DELETE` | `/api/issues/:id` | Delete an issue |

### Create Issue Payload

```json
{
  "title": "Fix login page",
  "description": "Buttons misaligned on mobile",
  "status": "backlog",
  "priority": "high"
}
```

### Issue Fields

| Field | Type | Values |
|-------|------|--------|
| `status` | string | `backlog`, `active`, `done` |
| `priority` | string | `none`, `low`, `medium`, `high`, `urgent` |
| `assignee` | string | Free text |
| `labels` | string[] | Array of label strings |
| `project` | string | Free text |
