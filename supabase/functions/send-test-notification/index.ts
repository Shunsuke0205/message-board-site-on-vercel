import webpush from "npm:web-push@^3.6.7";
import { createClient } from "npm:@supabase/supabase-js@^2.48.0";

Deno.serve(async (req) => {
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY")!;
  const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY")!;
  const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") || "mailto:shunsukehirata777@gmail.com";

  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return new Response("Unauthorized", { status: 401 });
  
  const supabaseAuth = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!);
  const { data: { user }, error: userError } = await supabaseAuth.auth.getUser(authHeader.replace("Bearer ", ""));

  if (userError || !user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const { data: subscriber, error: subscriberError } = await supabaseAdmin
    .from("push_subscriptions")
    .select("endpoint, auth_key, p256dh_key")
    .eq("userId", user.id) // カラム名を確認：userId
    .single();


  if (subscriberError || !subscriber) {
    return new Response(JSON.stringify({ message: "Subscriber not found" }), { status: 404 });
  }

  try {
    const payload = JSON.stringify({
      title: "「えん」の通知テスト",
      body: "受信できていますか？",
      badgeCount: 1,
      data: { url: "/" },
      tag: "test-notification",
    });
    const config = {
      endpoint: subscriber.endpoint,
      keys: { auth: subscriber.auth_key, p256dh: subscriber.p256dh_key },
    }

    await webpush.sendNotification(config, payload);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error sending DM notification:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }  
});
