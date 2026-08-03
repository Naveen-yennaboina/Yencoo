# Yencoo Database Operations

This project uses Prisma ORM with PostgreSQL.

## Prerequisites
- Node.js
- PostgreSQL running locally or remotely
- Ensure your `.env` file contains valid `DATABASE_URL` and `DIRECT_URL`.

## Common Prisma Commands

### 1. Generating the Prisma Client
Whenever you modify `schema.prisma`, you need to regenerate the Prisma client to reflect the new types.
```bash
npx prisma generate
```

### 2. Creating Migrations (Development)
When you make changes to `schema.prisma` in a development environment, run this to create a migration file and apply it to the database:
```bash
npx prisma migrate dev --name <migration_name>
```
*Note: This command will also run `npx prisma generate` and execute the seed script automatically.*

### 3. Deploying Migrations (Production)
In a CI/CD pipeline or staging/production environment, run this command to apply pending migrations without resetting the database:
```bash
npx prisma migrate deploy
```

### 4. Database Seeding
To populate the database with initial/dummy data (defined in `prisma/seed.ts`):
```bash
npx prisma db seed
```

### 5. Exploring the Database (Prisma Studio)
Prisma comes with a built-in GUI to view and edit the data in your database:
```bash
npx prisma studio
```

### 6. Resetting the Database
If you need to completely wipe the database and re-apply all migrations (this will also run the seed script):
```bash
npx prisma migrate reset
```
**Warning:** This will delete all data in the database. Never run this in production!
