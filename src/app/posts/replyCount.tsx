import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

type ReplyCountProps = {
  postId: string;
};


const ReplyCount =  ({ postId } : ReplyCountProps) => {
  async function getReplyCount() {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("replyToPost")
      .select("*", { count: "exact" })
      .eq("isDeleted", false)
      .eq("originalPostId", postId);

    if (error) {
      console.error("Error fetching data from Supabase in ReplyCount:", error);
      return <div>Error fetching data</div>;
    }

    return count;
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
