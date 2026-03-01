import iconNumberToSource from "@/utils/iconManeger/iconNumberToSource";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

type TargetProfileProps = {
  targetId: string;
}

const TargetProfile = async ({ targetId }: TargetProfileProps) => {
  const supabase = await createClient();
  const { data: clientData, error: clientError } = await supabase.auth.getUser();
  if (clientError || !clientData?.user) {
    console.error("Error fetching user from Supabase in DM:", clientError);
    return (
      <div>
        ログインされていないので相手のお名前を表示できませんでした。      
      </div>
    );
  }
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
      <Link href={`/profile/${targetId}`}>
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
      </Link>
    </div>
  )
}

export default TargetProfile