import webpush from "npm:web-push@^3.6.7";
import { createClient } from "npm:@supabase/supabase-js@^2.48.0";

Deno.serve(async () => {
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY")!;
  const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY")!;
  const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") || "mailto:shunsukehirata777@gmail.com";

  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  try {
    const date = new Date();
    date.setHours(date.getHours() - 24);
    const twentyFourHoursAgo = date.toISOString();

    const { count, error: postError } = await supabaseAdmin
      .from("post")
      .select("*", { count: 'exact', head: true })
      .eq("isDeleted", false)
      .gte("createdAt", twentyFourHoursAgo);

    if (postError) throw postError;

    if (!count || count === 0) {
      return new Response(JSON.stringify({ message: "No new posts today." }), { status: 200 });
    }

    const { data: subscribers, error: subError } = await supabaseAdmin
      .from("profile")
      .select(`
        "allowPostNotifications",
        push_subscriptions ( endpoint, auth_key, p256dh_key )
      `)
      .eq("allowPostNotifications", true);

    if (subError) throw subError;

    const allSubscriptions = subscribers?.flatMap(s => s.push_subscriptions) || [];

    if (allSubscriptions.length === 0) {
      return new Response(JSON.stringify({ message: "No subscribers found." }), { status: 200 });
    }

    const pushPayload = JSON.stringify({
      title: "「えん」新着ポストのお知らせ",
      body: "今日新しい投稿がありました！チェックしてみましょう。",
      data: { url: "/posts" }
    });

    const pushResults = await Promise.allSettled(
      allSubscriptions.map(async (sub: any) => {
        try {
          await webpush.sendNotification({
            endpoint: sub.endpoint,
            keys: { auth: sub.auth_key, p256dh: sub.p256dh_key }
          }, pushPayload);
        } catch (error: any) {
          if (error.statusCode === 410 || error.statusCode === 404) {
            await supabaseAdmin.from("push_subscriptions").delete().eq("endpoint", sub.endpoint);
          }
          throw error;
        }
      })
    );

    const successCount = pushResults.filter(r => r.status === "fulfilled").length;

    return new Response(JSON.stringify({ success: true, sent_count: successCount }), { status: 200 });

  } catch (error: any) {
    console.error("Daily notification error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});