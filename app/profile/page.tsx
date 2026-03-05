// app/profile/page.tsx

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AvatarUpload from "../_components/avatar_upload";
import { revalidatePath } from "next/cache";

export default async function Profile() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  const userId = user.id;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  async function updateProfile(formData: FormData) {
    "use server";

    const full_name = formData.get("full_name");
    const supabase = await createClient();

    await supabase
      .from("profiles")
      .update({ full_name })
      .eq("id", userId);

    revalidatePath("/profile");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Profile
        </h1>

        <form action={updateProfile} className="flex flex-col gap-4">

          <label className="text-sm font-medium">
            Email
          </label>
          <div className="p-2 border rounded bg-gray-50 text-gray-700">
            {user.email}
          </div>

          <label className="text-sm font-medium">
            Full Name
          </label>
          <input
            name="full_name"
            defaultValue={profile?.full_name ?? ""}
            placeholder="Enter your name"
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Save Profile
          </button>

        </form>

        <div className="mt-8 border-t pt-6">
          <h2 className="text-lg font-semibold mb-3">
            Avatar
          </h2>

          {profile?.avatar_url && (
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
          )}

          <AvatarUpload userId={userId} />
        </div>

      </div>
    </main>
  );
}