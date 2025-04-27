import { createClient } from "@/utils/supabase/server";
import React from "react";
import PostCard from "./PostCard";
import { PostProps } from "@/utils/postType";

const PostCardList = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("post")
    .select(`
      *,
      profile(
        nickname,
        icon
      )
    `)
    .order("createdAt", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Error fetching data from Supabase in PostCardList:", error);
    return <div>データの取得に失敗しました。</div>;
  }
  if (!data) {
    console.error("No data found in PostCardList");
    return <div>データの取得に失敗したか、データがありませんでした。</div>;
  }


  return (
    <div>
      {data.map((post) => {
        const postData: PostProps = {
          id: post.id,
          createdAt: post.createdAt,
          postedBy: post.postedBy,
          body: post.body,
          category: post.category,
          isAcceptReply: post.isAcceptReply,
          isDeleted: post.isDeleted,
          profile: {
            nickname: post.profile?.nickname,
            icon: post.profile?.icon || -1,
          },
        };

        if (postData.isDeleted) {
          return null;
        }
        return (
          <PostCard
            key={postData.id}
            post={postData}
          />
        )
      })}
    </div>
  )
}

export default PostCardList
