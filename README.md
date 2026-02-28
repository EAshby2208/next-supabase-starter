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
supabase start
```
Apply database schema
```bash
supabase db reset
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
### Important Files


## Using This Starter For New Projects

## Environment Variables
Create `.env.local`

    NEXT_PUBLIC_SUPABASE_URL=<br>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<br>
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<br>
    
Get value from:
```
supabase status
```
Do NOT commit `.env.local`

## Database Schema Overview

## Authentication Flow

## File Storage

## Deploment Instructions

## GitHub Actions Migration Workflow

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

