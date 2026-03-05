// app/dashboard/page.tsx
import {redirect} from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "../_components/logout_button";

export default async function Dashboard() {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const {data: profile} = await supabase
        .from("profiles")
        .select("*")
        .eq("id",user.id)
        .single();

    return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>

      <div className="bg-white shadow rounded-xl p-6 space-y-4">

        <h2 className="text-xl font-semibold border-b pb-2">
          Account Information
        </h2>

        <div className="space-y-2">
          <p>
            <span className="font-medium">Email:</span>{" "}
            {user.email}
          </p>

          <p>
            <span className="font-medium">Full Name:</span>{" "}
            {profile?.full_name ?? "Not set"}
          </p>
        </div>

      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-2">
          Welcome
        </h2>

        <p className="text-gray-600">
          This is your dashboard. From here you can manage your profile,
          update your avatar, and access protected pages.
        </p>
      </div>

    </div>
    );
}