/*
Http method used : Get (Standard http method for fetching the data)
URL PATH : https://lbmgtgjxhorenruvglmx.supabase.co/functions/v1/get_notes
No Params required
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

  const { data, error } = await supabase.from("notes").select().eq("user_id", user.id)

  if (error) return new Response(JSON.stringify(error), { status: 400 })
  return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } })
})
