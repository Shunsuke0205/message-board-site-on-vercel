import React, { Suspense } from "react"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link";
import Image from "next/image";

type ItemImage = {
  itemId: string;
  storagePath: string;
  isDeleted: boolean;
  postedBy: string;
};

type Item = {
  id: string;
  title: string;
  description: string;
  itemImage: ItemImage[];
  is_open: boolean;
  is_deleted: boolean;
  last_update_at: string;
};

type ItemWithImageUrl = Item & {
  itemImage: (ItemImage & {
    signedUrl?: string;
  })[];
};

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
  const itemsWithUrl : ItemWithImageUrl[] = itemData.map((item, index) => {
    const url = urlData?.[index]?.signedUrl;
    return {
      ...item,
      itemImage: item.itemImage.map((img : ItemImage) => ({
        ...img,
        signedUrl: url,
      })),
    };
  });
  // console.log("itemsWithUrl", itemsWithUrl);




  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
      {itemsWithUrl.map((item) => {
        let imageUrl = "/closed_item.png";
        if (item.itemImage && item.itemImage.length > 0 && item.itemImage[0].signedUrl) {
          imageUrl = item.itemImage[0].signedUrl;
        }
        return (
          <Link href={`/second-hand/${item.id}`} key={item.id}>
            <div className="relative w-full aspect-square bg-gray-200 rounded overflow-hidden hover:shadow-lg transition">
              {/* サムネイル画像 */}
              <Image
                src={imageUrl}
                alt={item.title || 'No Title'}
                width={300}
                height={300}
                className="w-auto h-full max-h-full max-w-full object-contain mx-auto my-auto"
              />

              {/* 終了ラベル（is_openがfalseの場合）*/}
              {!item.is_open && (
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[100px] border-r-[100px] border-t-red-600 border-r-transparent">
                  <span className="absolute top-[-51px] left-[8px] text-white font-bold rotate-[-45deg] origin-top-left">
                    CLOSED
                  </span>
                </div>
              )}

            </div>
            {/* タイトル */}
            <div 
              className="pt-1 bg-white w-full  font-medium text-gray-800 truncate"
            >
              {item.title || 'タイトル未設定'}
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
      <Link href="/second-hand/upload">
        <div className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
          不用品を投稿する
        </div>
      </Link>
      <Suspense fallback={<div>表示しています・・・</div>}>
        <SecondHandPostList />
      </Suspense>
    </div>
  )
}

export default SecondHandPage
