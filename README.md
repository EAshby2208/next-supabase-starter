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
* Node.js &ge 18
* npm &ge 9
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
.env.example
.gitignore
README.md
```


## Important Files


## Environment Variables

## Supabase Requirements

### Storage Bucket

## Database Schema

## Routes

## Middleware / Session Handling

## Notes




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
