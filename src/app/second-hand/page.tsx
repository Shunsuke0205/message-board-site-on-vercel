import React, { Suspense } from "react"
import ImageFetch from "./ImageFetch"
import { createClient } from "@/utils/supabase/server"
import ImageUploader from "./ImageUploader";
import Link from "next/link";
import LocalizedDate from "@/component/LocalTime";

const SecondHandPostList = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("second_hand_item")
    .select(`
      *,
      item_image (
        id,
        item_id,
        storage_path
      )
    `)
    .eq("is_deleted", false)
    .order("last_update_at", { ascending: false })
    .limit(20);

  console.log("SecondHandPostList data", data);

  if (error) {
    return <div className="text-red-500">データの取得に失敗しました。</div>;
  }

  if (!data || data.length === 0) {
    return <div>現在、投稿はありません。</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {data.map((item) => (
        <Link href={`/second-hand/${item.id}`} key={item.id}>

          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.title || "タイトル未設定"}</h2>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{item.description || "説明なし"}</p>
            <div className="text-sm text-gray-500">
              <span className="font-medium">
                {item.is_free_shipping ? "送料無料" : "着払い"}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              <LocalizedDate createdAt={item.last_update_at} />
            </div>
            {item.item_image && item.item_image.length > 0}
          </div>
        </Link>
      ))}
    </div>
  );
}


const SecondHandPage = () => {
  return (
    <div>
      <p>SecondHandPage</p>
      <Link href="/second-hand/upload">
        不用品を投稿する
      </Link>
      <ImageUploader />
      <ImageFetch />
      <Suspense fallback={<div>表示しています・・・</div>}>
        <SecondHandPostList />
      </Suspense>
    </div>
  )
}

export default SecondHandPage
