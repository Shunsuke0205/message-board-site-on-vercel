"use client"

import React, { useState } from "react"
import { createClient } from "@/lib/supabase/client"

const ImageUploader = () => {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null)
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files)
    }
  }

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      setMessage('ファイルが選択されていません')
      return
    }

    setUploading(true)
    setMessage('アップロード中...')

    const uploadResults: string[] = [];

    for (const file of Array.from(files)) {
      const fileExtention = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExtention}`;
      const { error } = await supabase.storage.from('item').upload(fileName, file);

      if (error) {
        console.error(`アップロード失敗: ${file.name}`, error)
        uploadResults.push(`❌ ${file.name} のアップロードに失敗しました。`);
      } else {
        uploadResults.push(`✅ ${file.name} のアップロードが完了しました。`);
      }
    }

    setMessage(uploadResults.join('\n'));
    setFiles(null);
    setUploading(false);
  }



  return (
    <div>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        multiple
        className="border-2 border-gray-300 rounded p-2"
      />
      <button
        onClick={handleUpload}
        className="px-3 py-1 bg-blue-400 text-white font-bold rounded disabled:opacity-50 cursor-pointer hover:bg-blue-700 transition"
        disabled={uploading}
      >
        ⬆️ アップロード
      </button>

      {message && <p className="whitespace-pre-line">{message}</p>}
    </div>
  );
}

export default ImageUploader;
