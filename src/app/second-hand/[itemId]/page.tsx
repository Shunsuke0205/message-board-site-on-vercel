import { createClient } from "@/utils/supabase/server";
import React, { Suspense } from "react"

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

type ItemWithImageUrl = Item & {
  itemImage: (ItemImage & {
    signedUrl?: string;
  })[];
};


export default async function SecondHandItem({
  params,
} : {
  params: Promise<{ itemId: string }>
}) {
  const { itemId } = await params;
  const supabase = await createClient();
  const { data: itemData, error: itemError } = await supabase
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

  if (itemError || !itemData) {
    return <div className="text-red-500">申し訳ございません。データの取得に失敗しました。</div>;
  }

  const { data: urlData, error: urlError } = await supabase.storage
    .from("item")
    .createSignedUrl(itemData.itemImage[0].storagePath, 60 * 60 * 24); // 24時間有効
  if (urlError || !urlData) {
    console.error("Error creating signed URL in SecondHandItem:", urlError);
  }
  const itemWithImageUrl: ItemWithImageUrl = {
    ...itemData,
    itemImage: itemData.itemImage.map((image: ItemImage) => ({
      ...image,
      signedUrl: urlData?.signedUrl,
    })),
  };
  return (
    <div>
      <Suspense fallback={<div>表示しています・・・</div>}>
        {itemId}
      </Suspense>
    </div>
  )
};
