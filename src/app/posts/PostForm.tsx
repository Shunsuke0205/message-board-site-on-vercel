"use client"

import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

const PostForm = () => {
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error("Error fetching user in PostForm:", error);
        return;
      } else {
        setUserId(data.user.id);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert("恐れ入りますが、投稿にはログインが必要です。");
      return;
    }
    if (!body) {
      alert("内容が空欄になっているみたいです。");
      return;
    }

    const supabase = createClient();
    const { data : postData, error } = await supabase
      .from("post")
      .insert([{
        postedBy: userId,
        content: body,
        category: 0,
        isAcceptReply: true,
        isDeleted: false,
      }])
      .select("*")
      .single();

    if (error) {
      console.error("Error inserting post in PostForm:", error);
    } else {
      console.log("Post inserted:", postData);
      console.log("Post ID:", postData.id);
      if (!postData) {
        console.error("No post data returned from Supabase in PostForm");
        return;
      }
      const { data: reaction, error: reactionError } = await supabase
        .from("reactionToPost")
        .insert([{
          id: postData.id,
          like: 1,
        }])
      if (reactionError) {
        console.error("Error inserting reaction in PostForm:", reactionError);
      } else {
        console.log("Reaction inserted:", reaction);
      }
      setBody(""); // actually this is not necessary
      window.location.reload();
    }
  };


  return (
    <form>
      <div className="mt-1 flex max-sm:flex-col md:flex-row sm:items-end">
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="内容を入力してください。"
          className="
            sm:w-120 md:w-140
            h-32 mt-1 p-4 
            border-4 border-gray-300 
            rounded-md focus:outline-none"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="
            mt-2 ml-3 mb-1 py-1 px-4 
            cursor-pointer 
            bg-orange-200 hover:bg-orange-300 [box-shadow:3px_3px_rgb(100_100_100)] 
            rounded-md 
            active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:0px_0px_rgb(82_82_82)] 
            transition duration-200 
            max-sm:self-end"
        >
          投稿する
        </button>
      </div>
    </form>
  )
}

export default PostForm
