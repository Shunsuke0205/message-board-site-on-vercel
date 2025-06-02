import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import React, { Suspense } from "react"
import ItemRequestForm from "./itemRequestForm";
import CommentCard from "./commentCard";
import { CommentProps } from "@/utils/postType";
import DeleteButton from "./DeleteButton";
import CloseButton from "./CloseButton";

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
  postedBy: string;
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
      postedBy: posted_by,
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
    return <div className="text-red-500">申し訳ございません。データの取得に失敗したか、このアイテムは削除されました。</div>;
  }
  const itemData = itemDataTmp as Item;

  const { data: urlData, error: urlError } = await supabase.storage
    .from("item")
    .createSignedUrl(itemData.itemImage[0].storagePath, 60 * 60 * 24); // 24時間有効
  if (urlError || !urlData) {
    console.error("Error creating signed URL in SecondHandItem:", urlError);
  }
  const imageUrl = urlData?.signedUrl ? urlData.signedUrl : "/closed_item.png";

  const { data: commentsData, error: commentsError } = await supabase
    .from("item_request")
    .select(`
      createdAt: created_at,
      isDeleted: is_deleted,
      itemId: item_id,
      postedBy: posted_by,
      body,
      id,
      profile (
        nickname,
        icon
      )
    `)
    .eq("item_id", itemId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .limit(20);

  if (commentsError || !commentsData) {
    console.error("Error fetching comments in SecondHandItem:", commentsError);
  }

  const normalizedData: CommentProps[] = commentsData ? commentsData.map((comment) => ({
    ...comment,
    profile: Array.isArray(comment.profile)
      ? comment.profile[0] ?? null
      : comment.profile,
  })) : []; // To avoid the type inference bug. comment.profile is wrongly inferred as an array type.

  const { data: userData } = await supabase.auth.getUser();

  return (
    <div className="mt-5">
      {itemData.isDeleted ? (
        <div className="text-red-500">
          申し訳ございません。このアイテムは削除されました。
        </div>
      ) : (
      <div>
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
            
            {/* 🆕 投稿者のみが見ることのできる操作ボタン（取引終了・削除） */}
            {userData?.user?.id === itemData.postedBy && (
              <div>
                <DeleteButton
                  tableName="second_hand_item"
                  id={itemData.id}
                  postedBy={itemData.postedBy}
                  discription="このアイテムを削除する"
                />
                <CloseButton
                  tableName="second_hand_item"
                  id={itemData.id}
                  postedBy={itemData.postedBy}
                  discription="取引を終了する"
                />
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
        {itemData.isOpen && (
          <ItemRequestForm itemId={itemId} />
        )}

        <Suspense fallback={<div className="text-gray-500">コメントを表示しています・・・</div>}>
          {/* コメント一覧 */}
          <div className="mt-4">
            {normalizedData != null && normalizedData.length > 0 ? (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">コメント一覧</h2>
                {normalizedData.map((comment: CommentProps) => {
                  if (comment.isDeleted) {
                    return null;
                  }
                  const isOwner = userData?.user ? (comment.postedBy === userData.user.id) : false;
                  return <CommentCard key={comment.id} comment={comment} isOwner={isOwner} />;
                })}
              </div>
            ) : (
              <p className="text-gray-500">コメントはまだありません。</p>
            )}
          </div>
        </Suspense>
      </div>
      )}
    </div>
  )
};
