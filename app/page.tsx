// app/page.tsx

import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-white shadow rounded-lg p-8 w-full max-w-md text-center">

        <h1 className="text-2xl font-bold mb-6">
          Next.js + Supabase Starter
        </h1>

        {user ? (
          <>
            <p className="mb-4">Logged in as {user.email}</p>

            <Link
              href="/dashboard"
              className="text-blue-600 font-medium"
            >
              Go to Dashboard
            </Link>
          </>
        ) : (
          <div className="flex flex-col gap-4">

            <Link
              href="/login"
              className="text-blue-600 font-medium"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="text-blue-600 font-medium"
            >
              Sign Up
            </Link>

          </div>
        )}

      </div>
    </div>
  );
}