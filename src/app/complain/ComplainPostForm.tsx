"use client"

import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react"


const ComplainPostForm = () => {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error("Error fetching user in ComplainPostForm:", error);
        return;
      } else {
        setName(data.user.id);
      }
    };

    fetchUser();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body) {
      alert("内容が空欄になっているみたいです。");
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("complain")
      .insert([{
        name: name,
        body: body,
        tears: 1,
        good: 1,
        cheer: 1,
        bad: 0,
      }]);
    if (error) {
      console.error("Error inserting complain:", error);
    } else {
      console.log("Complain inserted:", data);
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
          className="ml-3 pb-[2px] border-b border-gray-500 focus:outline-none focus:border-b-2 focus:pb-[1px]"
        />
      </div>
      <div className="mt-1 flex items-end">
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="内容を入力してください。"
          className="w-2/3 h-32 mt-1 border-2 border-gray-300 p-4 rounded-md focus:outline-none"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="ml-3 mb-1 cursor-pointer bg-orange-200 hover:bg-orange-300 py-1 px-3 rounded-md active:translate-x-[2px] active:translate-y-[2px] [box-shadow:3px_3px_rgb(100_100_100)] active:[box-shadow:0px_0px_rgb(82_82_82)] transition duration-200"
        >
          吐き出す
        </button>
      </div>
    </form>
  )
}

export default ComplainPostForm
