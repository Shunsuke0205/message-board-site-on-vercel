import { createClient } from "@/utils/supabase/server";
import { ProfileType } from "../profileType";
import LogoutButton from "@/component/LogoutButton";
import Link from "next/link";
import { iconDictionary } from "../edit/iconData";
import Image from "next/image";
import DM_Button from "./DM_Button";


export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params;
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    console.error("Error fetching user from Supabase in UserProfilePage:", userError);
    return <div>Error fetching user data</div>;
  }
  

  // if (userData.user.id !== userId) {
  //   console.error("User ID mismatch in UserProfilePage");
  // }

  let profile: ProfileType = {
    id: -1,
    createdAt: "",
    userId: userData.user.id,
    nickname: "",
    sex: "",
    selfIntro: "",
    icon: -1,
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profile")
    .select("*")
    .eq("userId", userId)
    .single();

  if (profileError) {
    console.error("Error fetching profile from Supabase in UserProfilePage:", profileError);
    // return <div>Error fetching profile data</div>;
  }


  if (profileData) {
    profile = {
      id: profileData.id,
      createdAt: profileData.createdAt,
      userId: profileData.userId,
      nickname: profileData.nickname,
      sex: profileData.sex,
      selfIntro: profileData.selfIntro,
      icon: profileData.icon,
    };
  } else {
    console.error("No profile data found in UserProfilePage");
  }


  type SexProps = {
    sex: string | null;
  }
  const Sex = ({ sex } : SexProps) => {
    let sexInJapanese = "";
    if (sex === "male") {
      sexInJapanese = "男性";
    } else if (sex === "female") {
      sexInJapanese = "女性";
    } else if (sex == null || sex === "noAnswer") {
      sexInJapanese = "未設定";
    }
    return (
      <p>性別：{ sexInJapanese }</p>
    )
  }
  const iconNumber = profile.icon;
  let iconSrc = "/user_icon/anonymous_user_icon.png";
  if (iconNumber !== undefined && iconNumber !== null && iconNumber >= 0) {
    if (iconDictionary[iconNumber]) {
      iconSrc = `/${iconDictionary[iconNumber].Directory}/${iconDictionary[iconNumber].fileName}`;
    }
  }
 

  return (
    <div>
      { userData.user.id === userId ? <LogoutButton /> : null }
      <div className="mt-3 px-4 py-2 border-2 border-gray-300 rounded-lg">
        { userData.user.id === userId ?
          <p>ログイン用のメールアドレス：{userData.user.email}</p>
          :
          <DM_Button targetUserId={userId} targetUserName={profile.nickname} />
        }
        <div className="pt-4">
          <Image
            src={iconSrc}
            alt="icon"
            width={60}
            height={60}
            className="rounded-full 
              border-3 border-gray-300"
          />
          <p>
            アイコン：{(!iconDictionary[iconNumber]) ? "未設定" : iconDictionary[iconNumber].iconName}
          </p>
        </div>
        <p>ニックネーム：{ profile.nickname ? profile.nickname : "未設定" }</p>
        <Sex sex={profile.sex} />
        <p>自己紹介文：{ profile.selfIntro ? profile.selfIntro : "未設定" }</p>
      </div>
      { userData.user.id === userId ? 
        <Link 
          href="/profile/edit"
        >
          <button className="mt-4 px-3 py-2 border-2 border-gray-300 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-700 transition duration-300">
            プロフィールを編集する
          </button>
        </Link>
      :
        null
      }
    </div>
  )

}