# CV Platform

> **Work in progress**
>
> CV Platform is an unfinished full-stack job-matching application. The project is being developed with a React frontend and a NestJS backend, with PostgreSQL and TypeORM planned for persistent data storage.

## Current status

The project is currently in an early development stage. The frontend can request and display a small list of sample jobs from the backend, while the broader CV, user, and job-matching functionality is still being built.

### Currently available

- React and TypeScript frontend powered by Vite
- NestJS and TypeScript backend
- PostgreSQL development service through Docker Compose
- `GET /jobs` endpoint returning sample job postings
- Frontend jobs list with loading and error states
- Initial backend modules for users, jobs, and CVs
- TypeORM configuration for PostgreSQL

### Planned work

- Define and complete user, CV, and job posting data models
- Add user registration and authentication
- Implement CV creation, editing, upload, and parsing
- Replace sample jobs with database-backed job postings
- Add job search, filtering, and matching functionality
- Connect CV profiles to personalized job recommendations
- Add validation, authorization, and complete API documentation
- Expand automated unit and end-to-end test coverage
- Improve the frontend UI and add responsive layouts
- Add production configuration and deployment documentation

## Technology stack

- **Frontend:** React 19, TypeScript, Vite
- **Backend:** NestJS 11, TypeScript
- **Database:** PostgreSQL 16
- **ORM:** TypeORM
- **Validation:** `class-validator` and `class-transformer`
- **Testing:** Jest and Supertest

## Repository structure

```text
.
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── cv/              # CV functionality (in progress)
│   │   ├── jobs/            # Job functionality
│   │   └── users/           # User functionality (in progress)
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

The backend reads the database connection from `DATABASE_URL`. In the `backend` directory, create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/jobmatcher
PORT=3000
```

### Run the backend

In one terminal:

```bash
cd backend
npm run start:dev
```

The API runs at [http://localhost:3000](http://localhost:3000). The current jobs endpoint is available at [http://localhost:3000/jobs](http://localhost:3000/jobs).

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

The API is still under development. At present, the main implemented feature is:

```http
GET /jobs
```

It returns sample job postings. API routes for users, CVs, authentication, and matching are planned but not complete.

## Development notes

- The backend currently enables CORS for `http://localhost:5173`.
- TypeORM schema synchronization is enabled for the current development setup. Review this before using the application in production and replace it with migrations.
- The application is not production-ready and APIs, database models, and project structure may change.

## Contributing

Contributions and ideas are welcome while the project is being developed. For substantial changes, open an issue first to discuss the proposed approach. Please include tests and update this README when setup or behavior changes.

## License

No license has been selected for this project yet.
