# How to Deploy Your AI Directory

This guide will help you deploy your Next.js application to **Vercel** and set up a **PostgreSQL database** using **Supabase**.

## Prerequisites

1.  A GitHub account.
2.  A [Vercel account](https://vercel.com/signup).
3.  A [Supabase account](https://supabase.com/).

---

## Step 1: Push Your Code to GitHub

1.  Initialize a git repository if you haven't already:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub.
3.  Link your local repository to GitHub and push:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```

## Step 2: Set Up a Database on Supabase

1.  Log in to [Supabase](https://supabase.com/) and create a new project.
2.  Once the project is ready, go to **Project Settings** -> **Database**.
3.  Under **Connection String**, copy the **URI**. It should look like this:
    ```
    postgresql://postgres.YOUR_PROJECT_REF:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
    ```
    *Note: Make sure to replace `[YOUR-PASSWORD]` with the password you created for the project.*

## Step 3: Deploy to Vercel

1.  Log in to [Vercel](https://vercel.com/) and click **"Add New..."** -> **"Project"**.
2.  Import your GitHub repository.
3.  In the **Configure Project** screen:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: `web` (Since your app is inside the `web` folder).
4.  Expand **Environment Variables** and add the following:
    *   **Key**: `DATABASE_URL`
    *   **Value**: Paste the Supabase connection string you copied in Step 2.
5.  Click **Deploy**.

## Step 4: Set Up the Database Schema

Once deployed, your app needs the database tables. You can run the migration from your local machine connecting to the production database, or use the Vercel console.

**Option A: Run from Local Machine (Recommended)**

1.  In your local `.env` file, temporarily replace `DATABASE_URL` with your Supabase connection string.
2.  Run the migration command:
    ```bash
    npx prisma migrate deploy
    ```
3.  (Optional) Seed the database with initial data:
    ```bash
    npx prisma db seed
    ```
4.  Revert your local `.env` file to use your local SQLite database (`file:./dev.db`) for development.

## Step 5: Verify

Visit your Vercel URL (e.g., `https://your-project.vercel.app`). You should see your AI Directory live!

---

## Troubleshooting

*   **Database Connection Errors**: Double-check your `DATABASE_URL` in Vercel. Ensure you used the correct password and that special characters in the password are URL-encoded if necessary.
*   **Build Failures**: Check the build logs in Vercel for specific errors.
