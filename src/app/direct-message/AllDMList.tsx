import LocalizedDate from "@/component/LocalTime";
import iconNumberToSource from "@/utils/iconManeger/iconNumberToSource";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import React from "react"

const AllDMList = async () => {
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
  if (channelError) {
    console.error("Error fetching channel data from Supabase in DM:", channelError);
  }


  return (
    <div>
      {channelData && channelData.map((channel) => {
        const targetProfile = (channel.user1 === userData.user.id) ? channel.user2Profile : channel.user1Profile;
 
        return (
          <div key={channel.id} >
            <Link href={`/direct-message/${channel.id}`}>
              <div className="mb-4 px-2 py-2 border-3 border-gray-300 rounded-lg">
              <div className="flex items-end flex-col">
                <LocalizedDate createdAt={channel.last_update_at} />
              </div>
              <div className="flex items-center">
                <Image
                  src={iconNumberToSource(targetProfile?.icon)}
                  alt="Icon"
                  width={60}
                  height={60}
                  className="
                    rounded-full 
                    border-3 border-gray-300"
                />
                
                <span className="ml-4 font-bold">
                  {targetProfile?.nickname ? targetProfile?.nickname : "ニックネーム未設定"}
                </span>
                <span>さん</span>
              </div>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default AllDMList
