import webpush from "npm:web-push@^3.6.7";
import { createClient } from "npm:@supabase/supabase-js@^2.48.0";

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record;

    if (!record || !record.to) {
      return new Response(JSON.stringify({ message: "Invalid payload" }), { status: 400 });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY")!;
    const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY")!;
    const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") || "mailto:shunsukehirata777@gmail.com";

    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: receiver, error: profileError } = await supabaseAdmin
      .from("profile")
      .select(`
        "allowDmNotifications",
        push_subscriptions ( endpoint, auth_key, p256dh_key )
      `)
      .eq("userId", record.to)
      .single();

    if (profileError) throw profileError;

    if (!receiver) {
      return new Response(JSON.stringify({ message: "Receiver not found" }), { status: 404 });
    }
    if (!receiver.allowDmNotifications) {
      return new Response(JSON.stringify({ message: "Receiver has disabled DM notifications" }), { status: 403 });
    }
    if (!receiver.push_subscriptions || receiver.push_subscriptions.length === 0) {
      return new Response(JSON.stringify({ message: "Receiver has no push subscriptions" }), { status: 403 });
    }


    const pushPayload = JSON.stringify({
      title: "「えん」新着メッセージ",
      body: "「えん」で新しいメッセージが届きました。",
      badgeCount: 1,
      data: { url: `/direct_message/${record.channel_id}` },
    });


    const pushResults = await Promise.allSettled(
      receiver.push_subscriptions.map(async (sub: any) => {
        const pushConfig = {
          endpoint: sub.endpoint,
          keys: { auth: sub.auth_key, p256dh: sub.p256dh_key },
        };

        try {
          await webpush.sendNotification(pushConfig, pushPayload);
          return sub.endpoint;
        } catch (error: any) {
          if (error.statusCode === 410 || error.statusCode === 404) {
            console.log(`Subscription ${sub.endpoint} is no longer valid. Removing from database.`);
            await supabaseAdmin
              .from("push_subscriptions")
              .delete()
              .eq("endpoint", sub.endpoint);
          }
          throw error;
        }
      })
    );

    const successCount = pushResults.filter(result => result.status === "fulfilled").length;

    return new Response(
      JSON.stringify({ success: true, sent_count: successCount }),
      { headers: { "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending DM notification:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }  
});