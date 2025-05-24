"use client"

import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react"

const ItemRequestForm = ({ itemId }: { itemId: string }) => {
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    const {data: userData, error: userError} = await supabase.auth.getUser();
    if (userError || !userData.user) {
      console.error("Error fetching user in itemRequestForm:", userError);
      return;
    }
    if (!userData.user) {
      alert("恐れ入りますが、投稿にはログインが必要です。");
      return;
    }
    if (!body) {
      alert("内容が空欄になっているみたいです。");
      return;
    }

    const { error } = await supabase
      .from("item_request")
      .insert([{
        item_id: itemId,
        posted_by: userData.user.id,
        body: body,
        is_deleted: false,
      }])
      .select("id")
      .single();

    if (error) {
      console.error("Error inserting reply in ItemRequestForm:", error);
    } else {
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
          placeholder="コメントを入力してください。"
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
          コメントを送信する
        </button>
      </div>
    </form>
  )
}

export default ItemRequestForm;
