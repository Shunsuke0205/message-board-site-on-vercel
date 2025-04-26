import { createClient } from "@/utils/supabase/server"
import Link from "next/link";
import React from "react"
import { iconDictionary } from "../profile/edit/iconData";
import Image from "next/image";

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
      <h1>ダイレクトメッセージの送り方</h1>
      <p>
        まず
        <Link 
          href="/posts" 
          className="underline text-blue-500 hover:text-blue-700"
        >Post</Link>
        の投稿リストから、メッセージを送りたい相手のアイコンを押してその方のプロフィールを開いてください。
      </p>
      <p>
        すると、プロフィールページの上部にDMを送るボタンがあるので、そこを押していただくとその方とのDMのページに遷移します。
        DMのページに遷移しますので、メッセージを入力して送信してください。
      </p>

      <h1>DM一覧</h1>
      {channelData && channelData.map((channel) => {
        const targetId = (channel.user1 === userData.user.id) ? channel.user2 : channel.user1;
        const targetProfile = (channel.user1 === userData.user.id) ? channel.user2Profile : channel.user1Profile;


        const iconNumber = targetProfile?.icon;
        let iconSrc = "/user_icon/anonymous_user_icon.png";
        if (iconNumber !== undefined && iconNumber !== null && iconNumber >= 0) {
          if (iconDictionary[iconNumber]) {
            iconSrc = `/${iconDictionary[iconNumber].Directory}/${iconDictionary[iconNumber].fileName}`;
          }
        }
 
        return (
          <div key={channel.id} >
            <Link href={`/direct-message/${channel.id}`}>
              <div className="mb-4 px-2 py-2 border-3 border-gray-300 rounded-lg">
              <div className="flex items-end flex-col">
                {new Date(channel.last_update_at).toLocaleString()}
              </div>
              <div className="flex items-center">
                <Image
                  src={iconSrc}
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

export default DM_List
