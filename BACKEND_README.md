# Backend MVP Architecture Documentation

The frontend project has been upgraded with a complete Backend MVP architecture.

## Tech Stack

- **Database**: SQLite (Development) / PostgreSQL (Ready for Production)
- **ORM**: Prisma
- **Server**: Express.js with TypeScript
- **Authentication**: JWT & bcryptjs
- **File Uploads**: Multer (Local structure mapped for future cloud migration)

## Quick Start (Local Development)

The backend is built alongside the frontend API proxy to provide a seamless development experience.

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

An `.env.example` file is provided. Make sure `.env` is created:

```bash
cp .env.example .env
```

### 3. Initialize Database

Initialize the SQLite database with Prisma schemas:

```bash
npx prisma generate
npx prisma db push
```

### 4. Run the Full Stack App

We are using `concurrently` to run both Vite (Frontend) and Express (Backend) on one script:

```bash
npm run dev
```

Alternatively:

- Start Frontend only: `npm run dev:frontend`
- Start Backend only: `npm run dev:backend`

## External Features & Paid Services

All features that require external paid APIs are built with _Provider Adapters_ inside the `.env` configuration. You do **not** need to rewrite the architecture when subscribing to a service, just provide the tokens.

- **SMS Provider**: Configure `ENABLE_SMS` and your provider keys to send results & attendances.
- **Email Notifications**: Switch on `ENABLE_EMAIL` and add a provider (like SendGrid) to send Notices.
- **Cloud Storage**: By default, images save to `./uploads`. Set `ENABLE_CLOUD_STORAGE=true` and `AWS_S3` credentials to migrate file handling to the cloud.
- **Payment Gateway**: Edit `ENABLE_PAYMENT` to power the online Admission Form module.
- **Biometric Integration**: Provide hardware endpoints in `.env` to synchronize Staff/Student attendances.

## API Endpoints (`/api`)

- `/api/auth/login` - Login with credentials
- `/api/setup` - Seed the initial Super Admin account
- `/api/students` - Student CRUD operations
- `/api/notices` - Notice CRUD & publishing

_Note: All API routes check for headers carrying a valid Bearer Token assigned by the auth routes._
