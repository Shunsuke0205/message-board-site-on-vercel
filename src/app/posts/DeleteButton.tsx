"use client"

import React from "react"
import { createClient } from "@/utils/supabase/client"
import { PostCommonProps } from "@/utils/postType"

type DeleteButtonProps = {
  post: PostCommonProps;
  tableName?: string;
};

const DeleteButton = ({ post, tableName } : DeleteButtonProps) => {

  const deleteHandler = async () => {
    // check if the user is logged in
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      console.error("Error fetching user in DeleteButton:", userError);
      return;
    }

    // check if the userId is the same as the post's postedBy
    if (userData.user.id !== post.postedBy) {
      alert("この投稿はあなたのものではありません。");
      return;
    }

    // delete the post
    const { error } = await supabase
      .from(tableName || "post")
      .update({ isDeleted: true })
      .eq("id", post.id)
      .eq("postedBy", userData.user.id);
    if (error) {
      console.error("Error deleting post in DeleteButton:", error);
      return;
    } else {
      window.location.reload();
    }
  }
  return (
    <div>
      <button
        className="
          mt-3 px-4 py-1 
          bg-red-400 
          font-bold text-white 
          rounded cursor-pointer"
        onClick={deleteHandler}
      >
        投稿を消す
      </button>
    </div>
  )
}

export default DeleteButton
