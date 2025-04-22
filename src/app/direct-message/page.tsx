import { createClient } from "@/utils/supabase/server"
import React from "react"

const DM = async () => {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return (
      <div>
        <h1>DM</h1>
        <p>右上のログインボタンを押してログインしてください。</p>
      </div>
    )
  }



  return (
    <div>
      <h1>DM</h1>
      <p>&#x1f6a7; 寄付・DM・おゆずり機能はおいおい実装させていただきます。 &#x1f647;&#x1f3fb;&#x200d;&#x2640;&#xfe0f;</p>
    </div>
  )
}

export default DM