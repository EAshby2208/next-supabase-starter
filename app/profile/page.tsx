// app/profile/page.tsx

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AvatarUpload from "../_components/avatar_upload";

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
  }

  return (
    <div>
      <h1>Profile</h1>

      <form action={updateProfile}>
        <input
          name="full_name"
          defaultValue={profile?.full_name ?? ""}
        />

        <button type="submit">
          Save
        </button>
      </form>
      <AvatarUpload userId={userId} />
    </div>
  );
}