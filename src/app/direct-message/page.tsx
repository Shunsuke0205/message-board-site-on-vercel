import { createClient } from "@/utils/supabase/server"
import Link from "next/link";
import React from "react"

const DM_List = async () => {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return (
      <div>
        <h1>DM</h1>
        <p>右上のログインボタンを押してログインしてください。</p>
      </div>
    )
  }

  console.log("client id", userData.user.id);

  const { data: channelData, error: channelError } = await supabase
    .from("channel")
    .select(`
      *,
      user1Profile:profile!channel_user1_fkey1 (
        nickname,
        icon
      ),
      user2Profile:profile!channel_user2_fkey1 (
        nickname,
        icon
      )
    `)
    .or(`user1.eq.${userData.user.id},user2.eq.${userData.user.id}`)
    .order("last_update_at", { ascending: false });
  console.log("channelData", channelData);
  if (channelError) {
    console.error("Error fetching channel data from Supabase in DM:", channelError);
  }

  return (
    <div>
      <h1>DM</h1>
      {channelData && channelData.map((channel) => {
        const targetId = (channel.user1 === userData.user.id) ? channel.user2 : channel.user1;
        return (
          <div key={channel.id} >
            <Link href={`/direct-message/${channel.id}`}>
              
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default DM_List
