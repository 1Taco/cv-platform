# CV Platform

> **Work in progress**
>
> CV Platform is an unfinished full-stack job-matching application for the Lithuanian job market. The project is being developed with a React frontend and a NestJS backend, using PostgreSQL and TypeORM for persistent data storage, and Google Gemini for AI-powered CV parsing.

## Current status

The project is in active development. CV upload, text extraction, and AI-powered parsing are fully working end-to-end. Job listing storage currently uses sample data, and the matching engine has not been built yet.

### Currently available

- React and TypeScript frontend powered by Vite
- NestJS and TypeScript backend
- PostgreSQL development service through Docker Compose
- TypeORM configuration for PostgreSQL, with `User`, `JobPosting`, and `Cv` entities
- `GET /jobs` endpoint returning sample job postings
- Frontend jobs list with loading and error states
- **CV upload endpoint** accepting PDF and DOCX files (Multer, in-memory storage, file size limit, extension-based type filtering)
- **Text extraction** from both PDF (`pdf-parse`) and DOCX (`mammoth`), with a filename-extension fallback for unreliable MIME types
- **AI-powered CV parsing** via Google Gemini (`gemini-3.6-flash`) — extracted CV text is sent to Gemini and returned as structured JSON (name, contact info, job titles, skills, experience, education, languages)
- **Retry logic with exponential backoff** for transient Gemini API failures
- Parsed CV profiles persisted to PostgreSQL (`jsonb` column for the parsed profile, plus the raw extracted text)

### Planned work

- Source real job listing data for the Lithuanian market (no major local job board offers a public API; scraping and/or the Lithuanian Employment Service's open data are being evaluated) and replace sample jobs with it
- Add user registration and authentication
- Frontend CV upload UI, with an editable review step so users can correct AI extraction mistakes
- Matching engine — embedding-based similarity between parsed CV profiles and job postings, with AI-generated explanations for each match
- Graceful handling of malformed AI responses (currently a rough edge)
- Add validation, authorization, and complete API documentation
- Expand automated unit and end-to-end test coverage
- Improve the frontend UI and add responsive layouts
- Add production configuration and deployment documentation

## Technology stack

- **Frontend:** React 19, TypeScript, Vite
- **Backend:** NestJS 11, TypeScript
- **Database:** PostgreSQL 16
- **ORM:** TypeORM
- **AI:** Google Gemini (`gemini-3.6-flash`) via `@google/genai`
- **File parsing:** `pdf-parse` (PDF), `mammoth` (DOCX)
- **Validation:** `class-validator` and `class-transformer`
- **Testing:** Jest and Supertest

## Repository structure

```text
.
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── cv/              # CV upload, parsing, and AI extraction
│   │   ├── jobs/             # Job functionality
│   │   └── users/            # User functionality (in progress)
│   └── docker-compose.yml   # Local PostgreSQL service
└── frontend/                # React + Vite application
    └── src/
        ├── api/             # API client
        └── components/      # React components
```

## Prerequisites

Install the following before starting the project:

- Node.js 20 or newer
- npm
- Docker and Docker Compose, for the local PostgreSQL database

## Getting started

Clone the repository and install dependencies for both applications:

```bash
git clone https://github.com/1Taco/cv-platform.git
cd cv-platform

cd backend
npm install

cd ../frontend
npm install
```

### Start PostgreSQL

From the `backend` directory, start the development database:

```bash
cd backend
docker compose up -d db
```

The Docker Compose configuration creates a PostgreSQL database with these development credentials:

| Setting | Value |
| --- | --- |
| Host | `localhost` |
| Port | `5432` |
| Database | `jobmatcher` |
| Username | `postgres` |
| Password | `postgres` |

> These credentials are intended for local development only. Do not use them in a production environment.

### Configure the backend

The backend reads the database connection from `DATABASE_URL`, and requires a Gemini API key for CV parsing. In the `backend` directory, create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/jobmatcher
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com).

### Run the backend

In one terminal:

```bash
cd backend
npm run start:dev
```

The API runs at [http://localhost:3000](http://localhost:3000). The sample jobs endpoint is available at [http://localhost:3000/jobs](http://localhost:3000/jobs).

### Run the frontend

In a second terminal:

```bash
cd frontend
npm run dev
```

The frontend runs at the local URL printed by Vite, normally [http://localhost:5173](http://localhost:5173).

The frontend uses `http://localhost:3000` as the default API URL. To use another backend URL, create `frontend/.env` with:

```env
VITE_API_URL=http://localhost:3000
```

## Available commands

### Frontend

Run these commands from `frontend/`:

```bash
npm run dev       # Start the Vite development server
npm run build     # Type-check and build for production
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

### Backend

Run these commands from `backend/`:

```bash
npm run start:dev # Start NestJS in watch mode
npm run build     # Build the API
npm run start     # Start the API
npm run lint      # Run ESLint
npm run test      # Run unit tests
npm run test:e2e  # Run end-to-end tests
npm run test:cov  # Generate a test coverage report
```

## API status

The API is still under development. Implemented endpoints:

```http
GET /jobs
```

Returns sample job postings.

```http
POST /cv/upload
```

Accepts a PDF or DOCX file (multipart form-data, field name `file`), extracts its text, sends it to Gemini for structured parsing, saves the result to PostgreSQL, and returns the parsed CV profile.

API routes for users, authentication, real job data, and matching are planned but not complete.

## Development notes

- The backend currently enables CORS for `http://localhost:5173`.
- TypeORM schema synchronization is enabled for the current development setup. Review this before using the application in production and replace it with migrations.
- Gemini's free tier is rate-limited and can occasionally return transient `503` errors under load; the CV parsing service retries these automatically with exponential backoff.
- The application is not production-ready and APIs, database models, and project structure may change.

## License

No license has been selected for this project yet.
