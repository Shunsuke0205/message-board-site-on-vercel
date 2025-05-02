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
  if (!imageData) {
    console.error("No image data found in ImageFetch");
    return (
      <div>
        画像が見つかりませんでした。
      </div>
    );
  }


  console.log("imageData", imageData);
  const imageUrl = await supabase.storage
    .from("item")
    .createSignedUrl(imageData[0].name, 60 * 60 * 24, {
      transform: {
        width: 500,
        height: 500,
      }
    });
  console.log("imageUrl", imageUrl);
  console.log("imageUrl.data.publicUrl", imageUrl.data?.signedUrl);
  return (
    <div>
      <Image
        src={imageUrl.data.signedUrl}
        alt="Fetched Image"
        width={500}
        height={500}
      />
      {/* <img
        src={imageUrl.data?.signedUrl}
        alt="Fetched Image"
        width={500}
        height={500}
      /> */}
    </div>
  )
}

export default ImageFetch
