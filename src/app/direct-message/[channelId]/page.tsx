import { createClient } from '@/utils/supabase/server';
import React from "react"
import MessageForm from './MessageFrom';

export default async function Page({
  params,
}: {
  params: Promise<{ channelId: string }>
}) {
  const { channelId } = await params;
  const supabase = await createClient();
  const { data: clientData, error: clientError } = await supabase.auth.getUser();
  if (clientError || !clientData?.user) {
    console.error("Error fetching user from Supabase in DM:", clientError);
    return <div>ログインされていないのでメッセージを表示できませんでした。</div>;
  }

  const { data: DMmessageData, error: DMmessageError } = await supabase
    .from("direct_message")
    .select("*")
    .eq("channel_id", channelId)
    .or(`user1.eq.${clientData.user.id},user2.eq.${clientData.user.id}`)
    .order("created_at", { ascending: true });

  if (DMmessageError) {
    console.error("Error fetching DM messages from Supabase in DM:", DMmessageError);
    // return <div>メッセージの取得に失敗しました。</div>;
  }
  console.log("DMmessageData", DMmessageData);

  const { data: channelData, error: channelError } = await supabase
    .from("channel")
    .select("user1, user2")
    .eq("id", channelId)
    .single();
  if (channelError || !channelData) {
    console.error("Error fetching channel data from Supabase in DM:", channelError);
    // return <div>チャンネルの取得に失敗しました。</div>;
  }
  console.log("channel id", channelId);
  console.log("channelData", channelData);
  const targetId = channelData?.user1 === clientData.user.id ? channelData.user2 : channelData?.user1;
  console.log("targetId", targetId);

  return (
    <div>
      {channelId}
      <MessageForm channelId={channelId} targetId={targetId} />
    </div>
  )
}

