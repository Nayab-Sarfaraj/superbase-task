CREATE TABLE notes(
    id uuid primary key default gen_default_uuid(),
    title varchar(100) not null,
    content text not null,
    important_points text[], 
    user_id uuid references auth.users(id),npx supabase init
    created_at timestamp with time zone default now()
)