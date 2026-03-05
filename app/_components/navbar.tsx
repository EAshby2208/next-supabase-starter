// app/_components/navbar.tsx

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="font-bold text-xl">
          Supabase Starter
        </Link>

        <div className="space-x-4">
          {!user ? (
            <>
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="text-blue-600 hover:underline">
                Dashboard
              </Link>
              <Link href="/profile" className="text-blue-600 hover:underline">
                Profile
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}