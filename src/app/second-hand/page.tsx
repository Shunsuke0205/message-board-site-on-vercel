import React, { Suspense } from "react"
import ImageFetch from "./ImageFetch"
import { createClient } from "@/utils/supabase/server"

const SecondHandPostList = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("second_hand")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div>
      SecondHandPostList
    </div>
  )
}


const SecondHandPage = () => {
  return (
    <div>
      SecondHandPage
      <ImageFetch />
      <Suspense fallback={<div>表示しています・・・</div>}>
        <SecondHandPostList />
      </Suspense>
    </div>
  )
}

export default SecondHandPage
