// app/_component/avatar_upload.tsx

"use client";

import { createClient } from "@/lib/supabase/client";

export default function AvatarUpload({ userId }: { userId: string }) {
  const supabase = createClient();

  async function upload(e: any) {
    const file = e.target.files?.[0];

    if (!file) return;
    if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        console.error("File must be an image");
        return;
    }

    const filePath = `${userId}-${Date.now()}`;
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
      });

    if (error || !data) {
        console.error(error);
        alert("Failed to upload avatar. Please try again.");
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

      location.reload();
  }

  return <input type="file" onChange={upload} />;
}