"use client"

import { createClient } from "@/lib/supabase/client"

type DeleteButtonProps = {
  tableName: string;
  id: string;
  postedBy: string;
  discription?: string; // Optional description for the button
};

const DeleteButton = ({ tableName, id, postedBy, discription } : DeleteButtonProps) => {

  const deleteHandler = async () => {
    // check if the user is logged in
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      console.error("Error fetching user in DeleteButton:", userError);
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
      .update({ is_deleted: true })
      .eq("id", id)
      .eq("posted_by", userData.user.id);
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
          mt-3 px-4 py-2 
          bg-red-400 
          font-bold text-white 
          rounded-xl cursor-pointer"
        onClick={deleteHandler}
      >
        {discription || "投稿を消す"}
      </button>
    </div>
  )
}

export default DeleteButton
