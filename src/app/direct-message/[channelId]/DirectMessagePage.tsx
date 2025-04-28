import { createClient } from "@/utils/supabase/server";
import React, { Suspense } from "react"
import MessageForm from "./MessageFrom";
import LocalizedDate from "@/component/LocalTime";
import TargetProfile from "./TargetProfile";

type MessageListProps = {
  channelId: string;
}

const DirectMessagePage = async ({ channelId }: MessageListProps) => {
  const supabase = await createClient();
  const { data: clientData, error: clientError } = await supabase.auth.getUser();
  if (clientError || !clientData?.user) {
    console.error("Error fetching user from Supabase in DM:", clientError);
    return (
      <div>
        ログインされていないのでメッセージを表示できませんでした。
      </div>
    );
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

  const targetId = channelData?.user1 === clientData.user.id ? channelData.user2 : channelData?.user1;

 
  return (
    <div>
      <Suspense fallback={<p>表示しています・・・</p>}>
        <TargetProfile targetId={targetId} />
      </Suspense>
      <Suspense fallback={<p>表示しています・・・</p>}>
        <MessageForm channelId={channelId} targetId={targetId} />
      </Suspense>
      <Suspense fallback={<p>表示しています・・・</p>}>
        {DMmessageData && DMmessageData.map((message) => {
          const isClientFrom = (message.from === clientData.user.id);
          return (
            <div key={message.id}
              className={`mt-2 px-3 py-2 border-2 border-gray-300 rounded-lg
                ${isClientFrom ? "bg-lime-200" : "bg-pink-200"}`}
            >
              <p className="whitespace-pre-wrap">
                {message.message}
              </p>
              <div>
                <LocalizedDate createdAt={message.created_at} />
              </div>
            </div>
          )
        })}
     </Suspense>
    </div>
  )
}

export default DirectMessagePage
