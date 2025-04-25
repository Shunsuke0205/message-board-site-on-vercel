import { createClient } from "@/utils/supabase/server"
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

  const { data: channelData, error: channelError } = await supabase
    .from("channel")
    .select("*")
    .or(`user1.eq.${userData.user.id},user2.eq.${userData.user.id}`);
  console.log("channelData", channelData);

  return (
    <div>
      <h1>DM</h1>
    </div>
  )
}

export default DM_List
