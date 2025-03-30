import { createClient } from "@/utils/supabase/server";
import React from "react";
import PostCard, { PostType } from "./PostCard";

const PostCardList = async () => {
  // fetch data from supabase
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("post")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Error fetching data from Supabase in PostCardList:", error);
    return <div>Error fetching data</div>;
  }
  if (!data) {
    console.error("No data found in PostCardList");
    return <div>No data found</div>;
  }

  console.log("Fetched data from Supabase in PostCardList:", data);

  return (
    <div>
      {data.map((post: PostType) => {
        const postData: PostType = {
          id: post.id,
          createdAt: post.createdAt,
          postedBy: post.postedBy,
          content: post.content,
          like: post.like,
          category: post.category,
          isAcceptReply: post.isAcceptReply,
          isDeleted: post.isDeleted,
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
