import { createClient } from "@/utils/supabase/server";


export default async function ReplyCount(id : Promise<{ id: string }>) {
  // const { id } = await params;
  // const { id: postId } = await id;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("replyToPost")
    .select("*")
    .eq("originalPostId", id)
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching data from Supabase in ReplyCount:", error);
    return <div>Error fetching data</div>;
  }

  return data.length;
}