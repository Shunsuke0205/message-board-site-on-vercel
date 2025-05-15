import { createClient } from "@/utils/supabase/server"
import Image from "next/image";
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


  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from("item")
    .createSignedUrl(imageData[0].name, 60 * 60 * 24);

  if (signedUrlError) {
    console.error("Error creating signed URL in ImageFetch:", signedUrlError);
    return (
      <div>
        画像のURL取得に失敗しました。
      </div>
    );
  }

  return (
    <div>
      <Image
        src={signedUrlData.signedUrl}
        alt="Fetched Image"
        width={300}
        height={300}
      />
    </div>
  )
}

export default ImageFetch
