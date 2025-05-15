"use client"

import React, { useState } from "react"
import { createClient } from "@/utils/supabase/client"

const ImageUploader = () => {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage("ファイルが選択されていません");
      return;
    }

    setUploading(true);
    setMessage("アップロード中...");

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage.from("item").upload(fileName, file);

    if (error) {
      console.error("アップロードエラー:", error);
      setMessage("アップロードに失敗しました");
    } else {
      setMessage("アップロードが完了しました");
      setFile(null);
    }

    setUploading(false);
  }

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        disabled={uploading}
      >
        アップロード
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ImageUploader;
