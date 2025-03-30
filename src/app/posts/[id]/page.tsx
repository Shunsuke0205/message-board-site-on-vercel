// import React from "react";

import { createClient } from "@/utils/supabase/server";


export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("replyToPost")
    .select("*")
    .eq("originalPostId", id)
    .order("createdAt", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Error fetching data from Supabase in ThreadPage:", error);
    return <div>Error fetching data</div>;
  }
  if (!data) {
    console.error("No data found in ThreadPage");
    return <div>No data found</div>;
  }



  return (
    <div>
      This is the thread page for post with ID: {id}.


    </div>
  )
}
