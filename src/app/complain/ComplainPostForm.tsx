"use client"

import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react"


const ComplainPostForm = () => {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  let userId: string | null;

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error("Error fetching user in ComplainPostForm:", error);
        return;
      } else {
        setName(data.user.id);
        userId = data.user.id;
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
        posted_by: name,
        text: body,
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
      <div>
        <label htmlFor="name">
          表示名
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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

export default ComplainPostForm
