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
    const { data, error } = await supabase
      .from("post")
      .insert([{
        postedBy: userId,
        content: body,
        like: 1,
        category: 0,
        isAcceptReply: true,
        isDeleted: false,
      }])

    if (error) {
      console.error("Error inserting post in PostForm:", error);
    } else {
      console.log("Post inserted:", data);
      setBody(""); // actually this is not necessary
      window.location.reload();
    }
  };


  return (
    <form>
      <div>
        <label htmlFor="body">
          内容
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="cursor-pointer"
      >
        投稿する
      </button>
    </form>
  )
}

export default PostForm
