"use client"

import { createClient } from "@/lib/supabase/client"

type CloseButtonProps = {
  tableName: string;
  id: string;
  postedBy: string;
  discription?: string; // Optional description for the button
};

const CloseButton = ({ tableName, id, postedBy, discription } : CloseButtonProps) => {

  const deleteHandler = async () => {
    // check if the user is logged in
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      console.error("Error fetching user in CloseButton:", userError);
      return;
    }

    // check if the userId is the same as the post's postedBy
    if (userData.user.id !== postedBy) {
      alert("この投稿はあなたのものではありません。");
      return;
    }

    // delete the post
    const { error } = await supabase
      .from(tableName)
      .update({ is_open: false })
      .eq("id", id)
      .eq("posted_by", userData.user.id);
    if (error) {
      console.error("Error closing item in CloseButton:", error);
      return;
    } else {
      window.location.reload();
    }
  }
  return (
    <div>
      <button
        className="
          mt-3 px-4 py-2 
          bg-gray-600 
          font-bold text-white 
          rounded-xl cursor-pointer"
        onClick={deleteHandler}
      >
        {discription || "取引を終了する"}
      </button>
    </div>
  )
}

export default CloseButton
