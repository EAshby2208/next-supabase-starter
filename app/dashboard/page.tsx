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
    const {data: profile} = await supabase.from("profiles").select("*").eq("id",user.id).single();

    return (
        <div>
            <h1>Dashboard</h1>
            <LogoutButton />
            <p>Email: {user.email}</p>
            <p>Full Name: {profile?.full_name}</p>
        </div>
    );
}