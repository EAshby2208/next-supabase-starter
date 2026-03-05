# Next.js + Supabase Auth App

## Project Description
This project is a full-stack web application built with **Next.js (App Router)**, **Supabase**, and **TypeScript**. It implements authentication, user profiles, avatar uploads, database migrations, and protected routes using server components and middleware.
The purpose is to serve as a reusable starter template for building new apps that require:
* User authentication
* Database storage
* File storage
* Server-side rendering
* Middleware session handling
* Supabase migrations

## Prerequisites
Before running project, install:
* Node.js ≥ 18
* npm ≥ 9
* Docker Desktop (required for Supabase local development)
* Supabase CLI
Install Supabase CLI:
```bash
npm install -g supabase
```
Start Docker before running Supabase

## Quick Start
Make the setup script executable (only needed once):

```bash
chmod +x scripts/setup.sh
```
Run the setup script:
```bash
npm run setup
```
Then start the app:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The setup script will:
* install dependencies
* start Supabase
* reset database
* apply schema migrations

## Manual Setup Instructions
If you prefer step-by-step setup:

Install dependencies
```bash
npm install
```
Start Supabase
```bash
npx supabase start
```
Apply database schema
```bash
npx supabase db reset
```
Start dev server
```bash
npm run dev
```

## Project Structure
```
app/
    layout.tsx
    page.tsx
    login/
        page.tsx
    signup/
        page.tsx
    dashboard/
        page.tsx
    profile/
        page.tsx
    _components/
        login_form.tsx
        signup_form.tsx
        logout_button.tsx
        avatar_upload.tsx
lib/
    supabase/
        client.ts
        server.ts
        proxy.ts
    hooks/
        useAuth.ts
supabase/
    schemas/
        profiles.sql
proxy.ts
package.json
tsconfig.json
.env.local
.gitignore
README.md
```
### Code Organization Decisions
* `app/_components/` → Reusable UI components
* `lib/supabase/` → Supabase client utilities
* `lib/hooks/` → Custom React hooks
* `supabase/schemas/` → Declarative database schemas

This ensures separation of concerns and scalability.

## Using This Starter For New Projects
1. Clone repository
2. Run `npm run setup`
3. Modify `profiles` schema as needed
4. Generate new migration:
    ```
    npx supabase db diff
    ```
5. Start building features

## Environment Variables
Create `.env.local`

    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

Get value from:
```
supabase status
```
Do NOT commit `.env.local`

## Database Schema Overview
The application includes a `profiles` table defined in:
```
supabase/schemas/profiles.sql
```
Schema/Columns:
* `id` (uuid, primary key, references auth.users)
* `email` (text)
* `full_name` (text)
* `avatar_url` (text)
* `updated_at` (timestamp with automatic trigger)
Triggers:
* `set_updated_at` automatically updates timestamp
* `handle_new_user` automatically creates profile on signup
Row Level Security is enabled.
Policies allow users to:
- read their own profile
- update their own profile
- insert their own profile

## Authentication Flow
1. User signs up or logs in
2. Supabase creates session
3. Middleware refreshes session on each request
4. Protected pages check session on server
5. If no session → redirect to login
6. If session exists → allow access

### Client Components
* `useAuth()` hook for accessing authenticated user
* `createBrowserCleint()` for client-side auth calls

### Server Components
* `createServerClient()` for secure server-side rendering

### Middleware
`proxy.ts` refreshes tokens automatically and ensures session consistency

## File Storage
Supabase Storage is used for avatar uploads.

Bucket name:

avatars

Upload flow:

1. User selects image
2. File uploaded to Supabase Storage
3. Public URL saved in profiles table
4. Avatar displayed in profile page

## Deployment Instructions
Deploy using Vercel.

1. Create Supabase Production Project
    - Create new project in Supabase Dashboard
    - Copy:
        - Project URL
        - anon public key
2. Push project to GitHub
3. Import repository in Vercel
4. Add environment variables in Vercel dashboard

    NEXT_PUBLIC_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

5. Link Production Database
    Locally:
    ```
    supabase link --project-ref YOUR_PROJECT_ID
    ```
    Push migrations:
    ```
    supabase db push
    ```
6. Deploy

## GitHub Actions Migration Workflow
Workflow file:
```
.github/workflows/migrate.yml
```
Triggers:
* On push to main
* When migrations change
Required GitHub Secrets
* SUPABASE_ACCESS_TOKEN
* SUPABASE_PROJECT_ID
The workflow steps:
1. Install Supabase CLI
2. Login using access token
3. Link to production project
4. Run migrations using `supabase db push`

## Troubleshooting
### Docker not running
Start Docker Desktop
```
supabase start
```
### Port already in use
Kill Next.js process
```
pkill node 
```
### Supabase already running
```
supabase stop
supabase start
```
### Database not updating
```
supabase db reset
```
### Login not working
Check:
```
.env.local 
```
### Avatar upload fails
Make sure bucket exists:
```
avatars 
```
and is public.

## Author
Elisabeth
Utah State University
Spring 2026
CS4610
