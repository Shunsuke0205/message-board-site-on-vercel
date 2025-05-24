import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import React, { Suspense } from "react"
import ItemRequestForm from "./itemRequestForm";
import CommentCard from "./commentCard";

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
  isOpen: boolean;
  isDeleted: boolean;
  lastUpdateAt: string;
};



export default async function SecondHandItem({
  params,
} : {
  params: Promise<{ itemId: string }>
}) {
  const { itemId } = await params;
  const supabase = await createClient();
  const { data: itemDataTmp, error: itemError } = await supabase
    .from("second_hand_item")
    .select(`
      id,
      title,
      description,
      isOpen: is_open,
      isDeleted: is_deleted,
      lastUpdateAt: last_update_at,
      itemImage: item_image (
        itemId: item_id,
        storagePath: storage_path,
        isDeleted: is_deleted,
        postedBy: posted_by
      )
    `)
    .eq("id", itemId)
    .eq("is_deleted", false)
    .single();

  if (itemError || !itemDataTmp) {
    return <div className="text-red-500">申し訳ございません。データの取得に失敗しました。</div>;
  }
  const itemData = itemDataTmp as Item;

  const { data: urlData, error: urlError } = await supabase.storage
    .from("item")
    .createSignedUrl(itemData.itemImage[0].storagePath, 60 * 60 * 24); // 24時間有効
  if (urlError || !urlData) {
    console.error("Error creating signed URL in SecondHandItem:", urlError);
  }
  const imageUrl = urlData?.signedUrl ? urlData.signedUrl : "/closed_item.png";

  const { data: commentData, error: commentError } = await supabase
    .from("item_request")
    .select(`
      id,
      createdAt: created_at,
      itemId: item_id,
      postedBy: posted_by,
      body,
      isDeleted: is_deleted,
      profile: profile (
        userId: userId,
        nickname: nickname,
        icon: icon
      )
    `)
    .eq("item_id", itemId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .limit(20);

  if (commentError) {
    console.error("Error fetching comments in SecondHandItem:", commentError);
  }
  console.log("commentData", commentData);

  return (
    <div className="mt-5">
      <Suspense fallback={<div className="text-gray-500">アイテムの情報を表示しています・・・</div>}>
        {/* 商品情報 */}
        <div className="relative">
          {/* 商品画像 */}
          <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={itemData.title}
              width={500}
              height={500}
              className="w-auto h-full max-h-full max-w-full object-contain mx-auto my-auto"
            />
          </div>

          {/* 終了ラベル（受付終了のとき） */}
          {!itemData.isOpen && (
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[100px] border-r-[100px] border-t-red-600 border-r-transparent">
              <span className="absolute top-[-51px] left-[8px] text-white font-bold rotate-[-45deg] origin-top-left">
                CLOSED
              </span>
            </div>
          )}

          {/* 商品説明文 */}
          <div className="mt-4">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              {itemData.title}
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              最終更新日: {new Date(itemData.lastUpdateAt).toLocaleDateString()}
            </p>

            <div className="border-t pt-4">
              <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                {itemData.description}
              </p>
            </div>

            {/* 状態表示 */}
            <div className="mt-6 flex items-center gap-4 text-sm">
              <span
                className={`px-3 py-1 rounded-full font-medium ${
                  itemData.isOpen ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                }`}
              >
                {itemData.isOpen ? "受付中" : "終了"}
              </span>
            </div>
          </div>
        </div>
      </Suspense>

      {/* コメントフォーム */}
      <ItemRequestForm itemId={itemId} />
      <Suspense fallback={<div className="text-gray-500">コメントを表示しています・・・</div>}>
        {/* コメント一覧 */}
        <div className="mt-4">
          {commentData != null && commentData.length > 0 ? (
            <div>
              
            <h2 className="text-lg font-semibold text-gray-900 mb-2">コメント一覧</h2>
            {
            commentData.map((comment) => {
              return <CommentCard key={comment.id} comment={comment} />;
            })}
            </div>
          ) : (
            <p className="text-gray-500">コメントはまだありません。</p>
          )}
        </div>
      </Suspense>
    </div>
  )
};
