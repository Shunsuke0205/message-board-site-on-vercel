import { createClient } from '@/utils/supabase/server';
import React, { Suspense } from "react"
import MessageForm from "./MessageFrom";
import Image from 'next/image';
import iconNumberToSource from '@/utils/iconManeger/iconNumberToSource';

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

  const targetId = channelData?.user1 === clientData.user.id ? channelData.user2 : channelData?.user1;
  const { data: targetProfileData, error: targetProfileError } = await supabase
    .from("profile")
    .select("nickname, icon")
    .eq("userId", targetId)
    .single();

  if (targetProfileError || !targetProfileData) {
    console.error("Error fetching target profile data from Supabase in DM:", targetProfileError);
  }


 

  return (
    <div>
      <Suspense fallback={<p>表示しています・・・</p>}>
        <div className="flex items-center">
          <Image
            src={iconNumberToSource(targetProfileData?.icon)}
            alt="アイコン"
            width={50}
            height={50}
            className="rounded-full mr-2"
          />
          <h1>{targetProfileData?.nickname ? targetProfileData.nickname : "ニックネーム未登録"}さん</h1>
        </div>
      </Suspense>
      <Suspense fallback={<p>表示しています・・・</p>}>
        <MessageForm channelId={channelId} targetId={targetId} />
        {DMmessageData && DMmessageData.map((message) => {
          const isClientFrom = (message.from === clientData.user.id);
          return (
            <div key={message.id}
              className={`mt-2 px-3 py-2 border-2 border-gray-300 rounded-lg
                ${isClientFrom ? "bg-lime-200" : "bg-pink-200"}`}
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
      </Suspense>
    </div>
  )
}

