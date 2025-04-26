"use client"

import { createClient } from "@/utils/supabase/client";
import React, { /* useEffect, */ useState } from "react"


const ComplainPostForm = () => {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  /*
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error("Error fetching user in ComplainPostForm:", error);
        return;
      } else {
        // setName(data.user.id);
      }
    };

    fetchUser();
  }, []);
  */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body) {
      alert("内容が空欄になっているみたいです。");
      return;
    }

    const supabase = createClient();
    const { data: complainData, error: complainError } = await supabase
      .from("complain")
      .insert([{
        name: name,
        body: body,
        tears: 1,
        good: 1,
        cheer: 1,
        bad: 0,
      }])
      .select("*")
      .single();

    if (complainError) {
      console.error("Error inserting complain:", complainError);
    } else {
      if (!complainData) {
        console.error("No complain data returned from Supabase");
        return;
      }
      const { error: reactionError } = await supabase
        .from("reactionToComplain")
        .insert([{
          id: complainData.id,
          tear: 1,
          heart: 1,
          cheer: 1,
        }])
      if (reactionError) {
        console.error("Error inserting reaction in ComplainPostForm:", reactionError);
      }
      setBody(""); // actually this is not necessary
      window.location.reload();
    }
  };



  return (
    <form>
      <div className="mt-2">
        <label htmlFor="name">
          表示名
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="表示名を入力してください。"
          className="
            ml-3 pb-[2px] 
            border-b border-gray-500 
            focus:outline-none focus:border-b-2 focus:pb-[1px]"
        />
      </div>
      <div className="mt-1 flex max-sm:flex-col md:flex-row sm:items-end">
        <label htmlFor="body"></label>
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
          吐き出す
        </button>
      </div>
    </form>
  )
}

export default ComplainPostForm
