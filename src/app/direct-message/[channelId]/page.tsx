import { createClient } from '@/utils/supabase/server';
import React from "react"
import MessageForm from "./MessageFrom";

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
  const { data: channelData, error: channelError } = await supabase
    .from("channel")
    .select("user1, user2")
    .eq("id", channelId)
    .single();
  if (channelError || !channelData) {
    console.error("Error fetching channel data from Supabase in DM:", channelError);
    return <div>チャンネルの取得に失敗しました。</div>;
  }
 
  const { data: DMmessageData, error: DMmessageError } = await supabase
    .from("direct_message")
    .select("*")
    .eq("channel_id", channelId)
    .or(`from.eq.${clientData.user.id},to.eq.${clientData.user.id}`)
    .order("created_at", { ascending: false });

  if (DMmessageError) {
    console.error("Error fetching DM messages from Supabase in DM:", DMmessageError);
    // return <div>メッセージの取得に失敗しました。</div>;
  }
  console.log("DMmessageData", DMmessageData);

  const targetId = channelData?.user1 === clientData.user.id ? channelData.user2 : channelData?.user1;

  return (
    <div>
      <MessageForm channelId={channelId} targetId={targetId} />
      {DMmessageData && DMmessageData.map((message) => {
        const isClientFrom = (message.from === clientData.user.id);
        return (
          <div key={message.id}
            className="p-3 border-2 rounded-lg"
          >
            <div>
              {isClientFrom ? "自分" : "相手"}: {message.message}
            </div>
            <div>
              {new Date(message.created_at).toLocaleString()}
            </div>
          </div>
        )
      })}

    </div>
  )
}

