/*
Http method used : POST (Standard  method for creating the notes)
URL PATH : https://lbmgtgjxhorenruvglmx.supabase.co/functions/v1/get_notes
Request body is required
*/
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response("Unauthorized", { status: 401 })

  const { title, content } = await req.json()

  const { data, error } = await supabase.from("notes").insert({
    user_id: user.id,
    title,
    content,
    
  }).select()

  if (error) return new Response(JSON.stringify(error), { status: 400 })
  return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } })
})
