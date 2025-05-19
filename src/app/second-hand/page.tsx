import React, { Suspense } from "react"
import ImageFetch from "./ImageFetch"
import { createClient } from "@/utils/supabase/server"
import ImageUploader from "./ImageUploader";
import Link from "next/link";
import Image from "next/image";

const SecondHandPostList = async () => {
  const supabase = await createClient();
  const { data: itemData, error: itemError } = await supabase
    .from("second_hand_item")
    .select(`
      *,
      itemImage: item_image (
        itemId: item_id,
        storagePath: storage_path,
        isDeleted: is_deleted,
        postedBy: posted_by
      )
    `)
    .eq("is_deleted", false)
    .order("last_update_at", { ascending: false })
    .limit(20);


  if (itemError) {
    return <div className="text-red-500">データの取得に失敗しました。</div>;
  }

  if (!itemData || itemData.length === 0) {
    return <div>現在、投稿はありません。</div>;
  }
  
  const paths = itemData.map((item) => item.itemImage?.[0]?.storagePath);
  const { data: urlData, error: urlError } = await supabase.storage
    .from("item")
    .createSignedUrls(paths.filter(Boolean) as string[], 60 * 60 * 24); // 24時間有効

  if (urlError) {
    console.error("Error fetching signed URLs in SecondHandPostList:", urlError);
    return <div className="text-red-500">画像の取得に失敗しました。</div>;
  }
  const itemsWithUrl = itemData.map((item, index) => {
    const url = urlData?.[index]?.signedUrl;
    return {
      ...item,
      itemImage: item.itemImage.map((img) => ({
        ...img,
        signedUrl: url,
      })),
    };
  });
  // console.log("itemsWithUrl", itemsWithUrl);




  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {itemsWithUrl.map((item) => {
        return (
          <Link href={`/second-hand/${item.id}`} key={item.id}>
            <div className="relative w-full aspect-square bg-white shadow-md rounded overflow-hidden hover:shadow-lg transition">
              {/* サムネイル画像 */}
              <Image
                src={item.itemImage?.[0]?.signedUrl}
                alt={item.title || 'No Title'}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />

              {/* 終了ラベル（is_openがfalseの場合）*/}
              {!item.is_open && (
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[100px] border-r-[100px] border-t-red-600 border-r-transparent">
                  <span className="absolute top-[-45px] left-[2px] text-white font-bold rotate-[-45deg] origin-top-left">
                    CLOSED
                  </span>
                </div>
              )}

              {/* タイトル */}
              <div className="absolute bottom-0 bg-white bg-opacity-80 w-full px-2 py-2 text-sm font-medium text-gray-800 truncate">
                {item.title || 'タイトル未設定'}
              </div>
            </div>
          </Link>
        );
      })}
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
      {/* <ImageUploader /> */}
      {/* <ImageFetch /> */}
      <Suspense fallback={<div>表示しています・・・</div>}>
        <SecondHandPostList />
      </Suspense>
    </div>
  )
}

export default SecondHandPage
