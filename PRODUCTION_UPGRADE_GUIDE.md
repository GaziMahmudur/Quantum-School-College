# QUANTUM SCHOOL & COLLEGE: PRODUCTION UPGRADE GUIDE

This document serves as a comprehensive roadmap for transforming the current free-first development MVP into a scalable, production-ready system capable of operating a real-world School or College.

## SECTION 1: CURRENT MVP ARCHITECTURE

The current Quantum School & College MVP is built as a modernized **monorepo** stack separated naturally between frontend and backend.

- **Frontend Technology:** React 19, TypeScript, Vite, TailwindCSS (v4), Framer Motion
- **Backend Technology:** Node.js, Express.js, TypeScript (running via `tsx` locally)
- **API Architecture:** RESTful standard via a monolithic Express configuration (`backend/app.ts`), segmented by controllers and routes.
- **Authentication Method:** JSON Web Tokens (JWT)
- **RBAC System:** Custom Express middleware checking token payloads for roles (`SUPER_ADMIN`, `ADMIN`, `PRINCIPAL`, `TEACHER`, `STUDENT`, `STAFF`).
- **ORM:** Prisma ORM
- **Current Database:** SQLite (Stored locally as `prisma/dev.db`)
- **File Upload System:** Local file system using `multer`, storing blobs in the local `uploads/` directory and serving statically via Express routes.
- **Admin Dashboard:** Handled inside the main React frontend leveraging `react-router-dom` separated by secure navigation guards.
- **Provider Adapter System:** Configuration stubs defined in `.env.example` with architecture placeholders, ready for modular expansion.

**Architecture Diagram:**

```text
Public Website / Admin Dashboard (React/Vite/Tailwind)
       ↓
   API Client (Fetch/XHR calls)
       ↓
   Express API Router (backend/routes/*)
       ↓
   Authentication + RBAC Middleware (JWT Validation)
       ↓
   Controllers (backend/controllers/* - Business Logic)
       ↓
   Prisma ORM Action (Prisma Client)
       ↓
   Database (SQLite - prisma/dev.db)
```

## SECTION 2: WHAT IS CURRENTLY FREE

Everything currently implemented in the project operates **100% locally and completely free of cost**.

### Completely Free

- **Local Development Environment:** React Vite and Express run seamlessly on `localhost`.
- **Database (SQLite):** Lives locally, completely free to evaluate.
- **File Storage:** Saves locally to the disk.
- **Authentication & Authorization:** Entirely homegrown using `bcryptjs` and `jsonwebtoken`. Full login, role-based checks, and session tokens are completely independent of third parties.
- **Management Features:** Notice board, Event agenda, Manual Attendance logging, Results/Exam tracking, and general CRUD operations work natively out of the box with zero external dependencies.

_(Note: While completely free to run on a local machine, moving these systems to cloud/online hosting will inevitably require infrastructure overhead for reliable operation)._

## SECTION 3: PRODUCTION READINESS ROADMAP

### Phase 1: Production Environment

Before exposing this application to the public web, the environment must be hardened.

- **Secure Secrets:** The MVP uses fallback strings like `'fallback-secret'`. In production, a 256-bit secure `JWT_SECRET` must be set in `.env` and kept strictly out of `.gitignore` version control.
- **Configuration Validation:** Explicit toggles must be enabled defining `NODE_ENV=production` configuring both Express and Vite behavior (caching, logging suppression).
- **Production Build:** The frontend cannot be served in dev mode. `vite build` must compile optimized static assets.

### Phase 2: Database Migration

Currently, `SQLite` serves as an incredible out-of-the-box development database. However, it handles concurrent writes poorly, meaning 50 students submitting data at once might lock the database.

**SQLite → PostgreSQL Migration Steps:**

1. Why PostgreSQL: It is explicitly designed for massive multi-user concurrent operations and relational constraints necessary for a real school.
2. Required Prisma Changes: Modify `prisma/schema.prisma` configuration `provider = "sqlite"` to `provider = "postgresql"`. Remove `.db` file constraints.
3. Replace the `DATABASE_URL` in `.env` with a real DB placeholder like `postgresql://quantumuser:strongpw@host/quantum_db`.
4. Apply the schema: `npx prisma migrate dev --name init` and push.
   _Note: A production PostgreSQL cluster can be self-hosted (cheaper, manual upkeep) or managed via AWS RDS, Supabase, Neon (paid for reliable multi-region uptime)._

### Phase 3: Production Backend Hosting

Operating a Node.js Express API reliably requires dedicated compute.

- **VPS / Self-Hosted (e.g., DigitalOcean, Hetzner, AWS EC2):** Outstanding price-to-performance. Requires manual security updates, PM2 process management, and manual restarts. (Mostly paid, but very cheap).
- **Managed Hosting (e.g., Render, Railway, Heroku):** Push-to-deploy systems that automatically manage uptime, SSL, and scaling. Extremely convenient. (Paid).
- **Institution-Owned Server:** No monthly fees besides electricity/internet. Highly private. High hardware maintenance.

### Phase 4: Frontend Deployment

Building the React/Vite UI involves creating the static web directory.

- Run `npm run build` yielding a `/dist` directory.
- Map environment variables for the Frontend using `VITE_API_URL=https://api.quantumschool.edu`.
- Ensure routing fallback allows `index.html` on deep links since this is a Single Page Application (SPA).
- Deploy to static networks like Vercel, Netlify, or Cloudflare Pages (all offer incredibly generous **FREE tiers** ideal for this frontend UI).

### Phase 5: Domain and HTTPS

For legitimacy, a school requires its customized `.edu`, `.com`, or `.org` domain.

- **Domain Name:** Must be purchased universally (Paid).
- **DNS Configuration:** Configure A-records leading to backend/frontend resources.
- **SSL/TLS (HTTPS):** Critical to encrypt student logins. Most managed providers (Vercel, Render) give free auto-renewing SSL certs via Let's Encrypt. If self-hosting, use Certbot.

## SECTION 4: PRODUCTION FILE STORAGE

Currently, image uploads (student avatars, notice attachments) live inside the local backend filesystem `uploads/`.
If deployed to a managed provider, server disks often wipe themselves (ephemeral storage).

**Production Options:**

- **Object Storage (AWS S3, Cloudinary):** Massively scalable, secure, and offloads heavy file serving from your backend. Highly recommended. (Tiered paid pricing).
- **Persistent Disk (Volume):** Appending a hard disk to a VPS ensures local `uploads/` stays intact when servers restart. Requires manual backup protocols.

If pivoting, you must abstract the `multer` disk storage pipeline (`backend/routes/file.routes.ts`) seamlessly into an AWS SDK S3 `upload` stream, modifying the `url` returned in `FileStorage` entries.

## SECTION 5: EMAIL SYSTEM

The existing environment allows Email Provider adaptation.

- **Why:** Necessary for "Forgot Password" self-service flows, institution-wide guardian alerts, and automated welcoming notices.
- **Configuration:**
  ```env
  ENABLE_EMAIL=true
  EMAIL_PROVIDER="sendgrid"
  EMAIL_API_KEY="SG.xxxxx"
  EMAIL_FROM_ADDRESS="no-reply@quantumschool.edu"
  ```
- **Testing:** Ensure SPF and DKIM records are configured via DNS to avoid mail getting stuck in spam folders.

## SECTION 6: SMS NOTIFICATION SYSTEM

Critical for real-time engagement that parents rely on.

- **Use Cases:** Emergency campus closures, unexpected daily student absence, or immediate result dissemination.
- **Provider considerations:** Twilio, Nexmo, or localized regional telecom gateways (which are often cheaper per SMS unit).
- **Configuration:**
  ```env
  ENABLE_SMS=true
  SMS_PROVIDER="regional_gateway"
  SMS_API_KEY="your_api_key"
  SMS_API_SECRET="your_secret"
  ```
  SMS features inherently carry unit transaction fees which multiply by student headcount. Proceed carefully and build caching/rate-limit adapters.

## SECTION 7: PAYMENT SYSTEM

While no billing mechanics currently exist, the abstraction allows easy onboarding of future online fee collections (admission, exams, monthly tuition).

- **Mechanism:** Integrating a payment provider adapter (Stripe, RazorPay, SSLCommerz).
- **Implementation Requirement:** Crucially relies on **Webhooks** sent gracefully from the provider back to your API confirming successful payments.
- **Storage:** Requires a new `Transaction` table linked directly to the `StudentProfile`.
- **Note:** Fully optional overhead. Setting this up relies on acquiring verified merchant accounts. Most gateways take a standardized percentage (2-3%) transaction commission fee. Do not implement a payment system until business requirements demand it.

## SECTION 8: BACKUP AND DISASTER RECOVERY

No school can afford to lose student academic records.

- **Daily:** Automated execution of a full Database snapshot (`pg_dump` mapped to an external cloud bucket).
- **Weekly:** Complete replication of all physical file storage (Images, PDF attachments).
- **Monthly:** "Restore Drill" – Actively proving the backup can be legally booted back up from scratch on a testing environment.
- **Offsite Backup Principle:** Never keep the backups on the identical physical server that hosts the primary database.

## SECTION 9: SECURITY HARDENING

Production deployment involves a strict paradigm shift in security standards:

- **HTTPS Enforcement:** Deny all HTTP connections.
- **CORS Production Rules:** Explicitly configure `app.use(cors({ origin: 'https://quantumschool.edu' }))`. Do not allow wildcard `*` anymore.
- **Password Limits:** Force rigorous password requirements and add `express-rate-limit` to prevent brute force login permutations.
- **JWT Rotation Strategy:** Ensure token expiration remains rigid; add a refresh token workflow mechanism if implementing longer sessions.
- **Input Validation Expansion:** The current API gracefully accesses `req.body`. Protect it further with a validation layer like `Zod` or `Joi` intercepting payloads before they hit Prisma controllers.

_(Note: JWT extraction and bcrypt hashing are already implemented in `auth.controller.ts`!)_

## SECTION 10: PERFORMANCE AND SCALABILITY

If the portal grows uniformly from 500 up to 10,000+ students:

- **Database Indexes:** You must add manual `@index` mapping in `schema.prisma` for critical queries like `Result(studentId)` or `Attendance(date)`.
- **Pagination implementation:** Current `.findMany()` fetches whole datasets (e.g. notices). When databases swell, chunk them via `skip` and `take` to keep the API payload incredibly small.
- **Connection Management:** An ORM like Prisma heavily taxes PostgreSQL connection pools. Eventually implementing `PgBouncer` becomes necessary to proxy concurrent requests safely.

## SECTION 11: MONITORING AND LOGGING

- **Server Monitoring:** Tools like PM2 or Datadog immediately flag CPU bottlenecks.
- **Error Tracking:** Implement `Sentry` into the generic Express wrapper (`app.ts` default error handler) to automatically document exceptions thrown in `.catch()` blocks in real-time.
- **API Health Checks:** Optional ping routes monitoring if the backend instances and database respond accurately.

## SECTION 12: REAL INSTITUTION GO-LIVE CHECKLIST

### Infrastructure

- [ ] Production database configured (PostgreSQL).
- [ ] Backend deployed.
- [ ] Frontend successfully statically deployed.
- [ ] HTTPS enabled.
- [ ] Domain configured properly via DNS.

### Security

- [ ] Secrets secured via environment variables.
- [ ] Default system passwords changed entirely.
- [ ] RBAC boundaries explicitly tested.
- [ ] Unauthorized access formally tested.

### Data

- [ ] Student data verified.
- [ ] Teacher data verified.
- [ ] Academic structure data verified.
- [ ] Database backup strictly tested.

### Operations

- [ ] Admin accounts created formally.
- [ ] Staff training completed.
- [ ] Backup schedule active.
- [ ] Restore procedure tested.

### External Services

- [ ] Email tested (if enabled).
- [ ] SMS tested (if enabled).
- [ ] Payment processor webhooks tested (if enabled).

## SECTION 13: PAID VS OPTIONAL COSTS

| Component            | Required for Production? | Can Be Free?    | Usually Paid? | Notes                                                                          |
| :------------------- | :----------------------- | :-------------- | :------------ | :----------------------------------------------------------------------------- |
| **Domain Name**      | Yes                      | No              | Yes           | Essential for professional credibility (`.edu` / `.com`).                      |
| **Frontend Hosting** | Yes                      | Yes             | No            | Vercel, Netlify offer highly generous free tiers perfect for Vite projects.    |
| **Backend Hosting**  | Yes                      | No              | Yes           | Reliable 24/7 Node.js compute is traditionally paid (VPS usually ~$5+/month).  |
| **Database Server**  | Yes                      | Yes (Self-Host) | Yes (Managed) | Self-hosted on VPS is "free", Managed clustered PostgreSQL carries fees.       |
| **File Storage**     | Yes                      | Yes (Local)     | Yes (Cloud)   | Large image directories outgrow local hosting; AWS S3 becomes necessary.       |
| **Email Gateway**    | Optional                 | Yes             | Yes           | Many SMTP providers offer up to 10k free daily emails.                         |
| **SMS Gateway**      | Optional                 | No              | Yes           | Every specific text message sent carries a marginal baseline transaction cost. |
| **Payment Gateway**  | Optional                 | N/A             | Yes           | Transaction percentage overhead (commission) per interaction.                  |
| **Backup Storage**   | Yes                      | Yes             | Yes           | Deep archival cloud buckets carry nominal storage costs.                       |
| **Monitoring**       | Optional                 | Yes             | Yes           | Error trackers like Sentry have solid free tiers for startups.                 |

---

## SECTION 14: FUTURE DEVELOPER HANDOVER

Welcome, future developer. Here is the actual architecture layout built entirely around modularity. It is imperative that you match this framework.

- **Frontend SPA:** Nested entirely inside `src/`. Bootstrapped using Vite plugin integration, organized cleanly by UI sections.
- **Backend Monolith Roots:** Found actively under the `backend/` root directory.
- **API Route Definitions:** Nested inside `backend/routes/`. This connects URL schemas to functions.
- **Logical Controllers:** Inside `backend/controllers/`. This separates business logic from REST logic.
- **Prisma Schema (Database Truth):** Located definitively at `prisma/schema.prisma`.
- **Environment Variables:** Outlined heavily inside `.env.example`. A custom local `.env` dictates execution.
- **Authentication and RBAC:** Fully implemented logic located exclusively inside `backend/middleware/auth.middleware.ts` and `backend/controllers/auth.controller.ts`.
- **File Local Storage Execution:** Exists independently inside `backend/routes/file.routes.ts` interacting with `multer` exporting locally to `uploads/`. Make adjustments here to divert assets to AWS S3.

## SECTION 15: STEP-BY-STEP UPGRADE ORDER

To flawlessly transform this MVP logic architecture into a fully operating production pipeline:

1. **Backup current MVP:** Ensure current SQLite datasets are secure.
2. **Audit environment variables:** Re-assign secure JWT secrets.
3. **Prepare production database:** Provision AWS RDS or Supabase.
4. **Migrate SQLite data to PostgreSQL:** Adjust `schema.prisma` and execute `prisma migrate deploy`.
5. **Test database:** Wire up local backend specifically targeting the exterior prod database temporarily.
6. **Configure production backend:** Implement containerization and deploy Express Node backend directly to Render or a VPS.
7. **Configure file storage:** Map uploads to S3 or a permanent disk volume logic hook.
8. **Deploy frontend:** Push React build static assets directly uniquely to Vercel/Cloudflare Pages linked to API URI.
9. **Configure domain and HTTPS:** Align DNS strictly limiting frontend/backend CORS.
10. **Enable backups:** Script pg_dump interval routines.
11. **Perform security audit:** Rotate all default system users and secrets again.
12. **Enable optional Email:** Add SendGrid keys.
13. **Enable optional SMS:** Add Twilio keys.
14. **Enable optional Payment:** Connect Stripe logic and webhook endpoints securely.
15. **Perform full staging test:** Do an end-to-end user pipeline sprint.
16. **Go live:** Formally launch portal to Institution.
