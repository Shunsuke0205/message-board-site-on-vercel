import { createClient } from "@/utils/supabase/server";
import { ProfileType } from "../profileType";
import LogoutButton from "@/component/LogoutButton";


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
  if (userData.user.id !== userId) {
    console.error("User ID mismatch in UserProfilePage");
    return <div>User ID mismatch</div>;
  } else {
    console.log(userData.user.id);
    console.log(userId);
  }

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



  return (
    <div>
      <LogoutButton />
      {/* <p>Hello {userData.user.email}</p>
      <p>Your user ID is &quot;{userData.user.id}&quot;</p> */}
    </div>
  )

}