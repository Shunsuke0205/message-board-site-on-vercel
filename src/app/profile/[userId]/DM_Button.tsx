"use client"

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import React from "react"

type DM_ButtonProps = {
  targetUserId: string;
  targetUserName?: string;
}

const DM_Button = ({ targetUserId, targetUserName }: DM_ButtonProps) => {
  const handleClick = async () => {
    const supabase = createClient();
    const { data: clientUserData, error: clientUserError } = await supabase.auth.getUser();
    if (clientUserError || !clientUserData?.user) {
      console.error("Error fetching client user data in DM_Button:", clientUserError);
      return;
    }

    const { data: existingChannel, error: existingChannelError } = await supabase
      .from("channel")
      .select("id")
      .or(`and(user1.eq.${clientUserData.user.id}, user2.eq.${targetUserId}), 
        and(user1.eq.${targetUserId}, user2.eq.${clientUserData.user.id})`)
      .single();

    let channelId: string;
    if (existingChannelError || !existingChannel) {
      const { data: newChannel, error: newChannelError } = await supabase
        .from("channel")
        .insert([
          { user1: clientUserData.user.id, user2: targetUserId },
        ])
        .select("id")
        .single();

      if (newChannelError) {
        console.error("Error creating new channel in DM_Button:", newChannelError);
        alert("申し訳ございません。おそらくバグが生じてしまい、DMの作成に失敗してしまいました。");
        return;
      }

      channelId = newChannel.id;
    } else {
      channelId = existingChannel.id;
    }

    redirect(`/direct-message/${channelId}`);
  }


  return (
    <div>
      <button
        onClick={handleClick}
        className="
          px-3 py-1
          border-2 border-gray-300 rounded-lg"
      >
        {targetUserName ? `${targetUserName}さんにDMを送信する` : "DMを送信する"}
      </button>
    </div>
  )
}

export default DM_Button
