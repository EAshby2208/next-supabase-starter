insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

create policy "Users can upload avatar"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'avatars');

create policy "Avatar images are public"
on storage.objects
for select
using (bucket_id = 'avatars');