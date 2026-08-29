# Stöpsel

Stöpsel is a mobile-first web application for Finland-Swedish dialect contributions. Read the product requirements in [docs/PROJECT_SPECS.md](docs/PROJECT_SPECS.md).

## Requirements

- Node.js 24 or later
- npm
- A persistent file system for the SQLite database

The current deployment target is one SvelteKit Node server with one persistent SQLite database. Do not deploy this configuration to temporary serverless storage. Review the database plan before you use more than one application instance.

## Local setup

1. Install the packages.

   ```sh
   npm ci
   ```

2. Copy `.env.example` to `.env`.
3. Generate a private `BETTER_AUTH_SECRET`.

   ```sh
   npx auth secret
   ```

4. Put the generated value in `.env`.
5. Apply the database migrations.

   ```sh
   npm run db:migrate
   ```

6. Start the development server.

   ```sh
   npm run dev
   ```

## Administrator setup

Public account registration is disabled. Create the first administrator only with the controlled server command below. Do not put the password on the command line. The command asks for it without showing it.

```sh
npm run auth:create-admin -- --email admin@example.com --name "Admin" --role admin
```

The administrator login page is `/admin/login`. Every protected administrator load function and action must call `requireAdmin` on the server.

If the Better Auth configuration changes, use this order:

1. Generate the Better Auth schema with `npm run auth:schema`.
2. Generate a Drizzle migration with `npm run db:generate`.
3. Review the generated SQL.
4. Apply it with `npm run db:migrate`.

Do not use `db:push` for a production database.

## Quality checks

```sh
npm run lint
npm run check
npm run test:unit -- --run
npm run build
npm run test:e2e
npm audit --audit-level=high
```

Install the Chromium test browser once on a new development computer:

```sh
npm run test:e2e:setup
```

## Production requirements

- Set `DATABASE_URL`, `ORIGIN`, and `BETTER_AUTH_SECRET` with the hosting secret system.
- Use HTTPS and secure proxy settings.
- Configure trusted proxy addresses before you depend on IP-based rate limits.
- Keep the SQLite file on persistent storage.
- Use an automated SQLite online backup or a storage snapshot that supports SQLite.
- Encrypt backups and keep them separate from the live database.
- Test a restore on a schedule.
- Run `npm run db:migrate` as a controlled deployment step.
- Keep public, operational, and future research data separate.

The hosting choice must include an automated backup and restore test before public launch.
