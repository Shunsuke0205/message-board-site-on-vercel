import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";

type ReplyCountProps = {
  postId: string;
};


const ReplyCount =  ({ postId } : ReplyCountProps) => {
  async function getReplyCount() {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("replyToPost")
      .select("*")
      .eq("originalPostId", postId)
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching data from Supabase in ReplyCount:", error);
      return <div>Error fetching data</div>;
    }

    return data.length;
  }

  const count = getReplyCount();

  return (
    <div>
      {/* <div>{postId}</div> */}
      <Suspense fallback={<div>Loading...</div>}>
        <div>コメント {count} 件</div>
      </Suspense>
    </div>
  )
}

export default ReplyCount
