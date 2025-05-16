import { createClient } from "@/utils/supabase/server"
import Image from "next/image";
import Link from "next/link";
import React from "react"

const ImageFetch = async () => {
  const supabase = await createClient();
  const { data: imageData, error: imageError } = await supabase.storage
    .from("item")
    .list();

  if (imageError) {
    console.error("Error fetching image from Supabase in ImageFetch:", imageError);
    return (
      <div>
        画像の取得に失敗しました。
      </div>
    );
  }
  if (!imageData || imageData.length === 0) {
    console.error("No image data found in ImageFetch");
    return (
      <div>
        画像が見つかりませんでした。
      </div>
    );
  }

  const signedUrls = await Promise.all(
    imageData.map(async (file) => {
      const { data, error } = await supabase.storage
        .from("item")
        .createSignedUrl(file.name, 60 * 60 * 24); // 24時間有効

      if (error || !data) {
        console.error(`URL生成失敗: ${file.name}`, error);
        return null;
      }

      return { name: file.name, url: data.signedUrl };
    })
  );

  // console.log("signedUrls", signedUrls);

  const validImages = signedUrls.filter((image) => image !== null)

  // console.log("validImages", validImages);


  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {validImages.map((image) => (
        <Link
          key={image!.name}
          href={image!.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={image!.url}
            alt={image!.name}
            width={300}
            height={300}
            className="rounded shadow"
          />
        </Link>
      ))}
    </div>
  )
}

export default ImageFetch
