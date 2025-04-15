import React from "react"
import ComplainCard from "./ComplainCard"
import { createClient } from "@/utils/supabase/server"
import { ComplainProps } from "@/utils/postType";

const ComplainCardList = async () => {
  // fetch data from supabase
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("complain")
    .select(`
      *,
      reactionToComplain(
        tear,
        heart,
        cheer
      )
    `)
    .order("createdAt", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Error fetching data from Supabase in ComplainCardList:", error);
    return <div>Error fetching data</div>
  }
  if (!data) {
    console.error("No data found in ComplainCardList");
    return <div>No data found</div>
  }
  // console.log("Fetched data from Supabase in ComplainCardList:", data);

  return (
    <div>
      {/* // Map through the fetched data and render ComplainCard for each item */}
      {data.map((post) => {
        const complain: ComplainProps = {
          id: post.id,
          createdAt: post.createdAt,
          name: post.name,
          body: post.body,
          bad: post.bad,
          category: post.category,
          reaction: {
            tear: post.reactionToComplain?.tear || 1,
            heart: post.reactionToComplain?.heart || 1,
            cheer: post.reactionToComplain?.cheer || 1,
          }
        }
        return (
          <ComplainCard
            key={complain.id}
            complain={complain}
          />
        )
      })}
    </div>
  )
}

export default ComplainCardList