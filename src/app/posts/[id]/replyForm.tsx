"use client"

import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react"

const ReplyForm = ({ postId }: { postId: string }) => {
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error("Error fetching user in ReplyForm:", error);
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
    const { data: replyData, error: replyError } = await supabase
      .from("replyToPost")
      .insert([{
        originalPostId: postId,
        postedBy: userId,
        body: body,
        isDeleted: false,
      }])
      .select("id")
      .single();

    if (replyError) {
      console.error("Error inserting reply in ReplyForm:", replyError);
    } else {
      // console.log("Reply inserted:", replyData);
      const { error: reactionError } = await supabase
        .from("reaction_to_reply")
        .insert([{
          id: replyData.id,
          like: 1,
        }])
      if (reactionError) {
        console.error("Error inserting reaction in ReplyForm:", reactionError);
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
          placeholder="贈る内容を入力してください。"
          // className="w-120 h-32 mt-1 border-2 border-gray-300 p-4 rounded-md focus:outline-none"
          className="
            sm:w-115 md:w-140
            h-32 mt-1 p-4 
            border-4 border-gray-300 
            rounded-md focus:outline-none"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          // className="ml-3 mb-1 cursor-pointer bg-orange-200 hover:bg-orange-300 py-1 px-3 rounded-md active:translate-x-[2px] active:translate-y-[2px] [box-shadow:3px_3px_rgb(100_100_100)] active:[box-shadow:0px_0px_rgb(82_82_82)] transition duration-200"

          className="
            mt-2 ml-3 mb-1 py-1 px-4 
            cursor-pointer 
            bg-orange-200 hover:bg-orange-300 [box-shadow:3px_3px_rgb(100_100_100)] 
            rounded-md 
            active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:0px_0px_rgb(82_82_82)] 
            transition duration-200 
            max-sm:self-end"
        >
          コメントを贈る
        </button>
      </div>
    </form>
  )
}

export default ReplyForm
