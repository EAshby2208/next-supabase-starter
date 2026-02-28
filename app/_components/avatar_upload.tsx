// app/_component/avatar_upload.tsx

"use client";

import { createClient } from "@/lib/supabase/client";

export default function AvatarUpload({ userId }: { userId: string }) {
  const supabase = createClient();

  async function upload(e: any) {
    const file = e.target.files[0];

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`${userId}.png`, file, {
        upsert: true,
      });
    if (error || !data) {
        console.error(error);
        return;
    }

    const { data: url } = supabase.storage
      .from("avatars")
      .getPublicUrl(data.path);

    await supabase
      .from("profiles")
      .update({
        avatar_url: url.publicUrl,
      })
      .eq("id", userId);
  }

  return <input type="file" onChange={upload} />;
}