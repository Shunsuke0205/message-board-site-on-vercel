import { createClient } from "@/utils/supabase/server";
import ReplyForm from "./replyForm";
import PostCard from "../PostCard";
import ReplyCard from "./replyCard";
import { Suspense } from "react";
import { ReplyProps } from "@/utils/postType";


export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: replies, error: repliesError } = await supabase
    .from("replyToPost")
    .select(`
      *,
      profile (
        nickname,
        icon
      ),
      reaction:reaction_to_reply (
        like
      )
    `)
    .eq("isDeleted", false)
    .eq("originalPostId", id)
    .order("createdAt", { ascending: false })
    .limit(20);

  if (repliesError) {
    console.error("Error fetching data from Supabase in ThreadPage:", repliesError);
    return <div>Error fetching data</div>;
  }
  if (!replies) {
    console.error("No data found in ThreadPage");
    return <div>No data found</div>;
  }

  const { data: originalPost, error: originalPostError } = await supabase
    .from("post")
    .select(`
      *,
      profile (
        nickname,
        icon
      ),
      reactionToPost:reactionToPost (
        like
      )
    `)
    .eq("id", id)
    .single();

  if (originalPostError) {
    console.error("Error fetching original post from Supabase in ThreadPage:", originalPostError);
    return <div>Error fetching original post</div>;
  }
  if (!originalPost) {
    console.error("No original post found in ThreadPage");
    return <div>No original post found</div>;
  }

  const { data: userData } = await supabase.auth.getUser();

  return (
    <div>
      <Suspense fallback={<div>表示しています・・・</div>}>
        <PostCard post={originalPost} />
      </Suspense>
      <Suspense fallback={<div>表示しています・・・</div>}>
        <ReplyForm postId={id} />
      </Suspense>
      <Suspense fallback={<div>表示しています・・・</div>}>
        {replies.map((reply) => {
          if (reply.isDeleted) {
            return null;
          }
          const replyData: ReplyProps = {
            id: reply.id,
            createdAt: reply.createdAt,
            originalPostId: reply.originalPostId,
            postedBy: reply.postedBy,
            body: reply.body,
            isDeleted: reply.isDeleted,
            profile: {
              nickname: reply.profile?.nickname,
              icon: reply.profile?.icon || -1,
            },
            reactionToReply: {
              like: reply.reaction?.like
            }
          };
          const isOwner = userData?.user ? (replyData.postedBy === userData.user.id) : false;

          return (
            <ReplyCard
              key={replyData.id}
              reply={replyData}
              isOwner={isOwner}
            />
          )
        })}
      </Suspense>
    </div>
  )
}
