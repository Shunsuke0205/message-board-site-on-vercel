import { createClient } from "@/utils/supabase/server";
import React, { Suspense } from "react"
import MessageForm from "./MessageFrom";
import TargetProfile from "./TargetProfile";
import MessageList from "./MessageList";

type DirectMessagePageProps = {
  channelId: string;
}

const DirectMessagePage = async ({ channelId }: DirectMessagePageProps) => {
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
        <MessageList channelId={channelId} />
      </Suspense>
    </div>
  )
}

export default DirectMessagePage
