"use client"

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const SecondHandPostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFreeShipping, setIsFreeShipping] = useState(true);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error("Error fetching user in SecondHandPostForm:", error);
        return;
      } else {
        setUserId(data.user.id);
      }
    };

    fetchUser();
  }, []);


  const handlePost = async () => {
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setMessage("投稿にはログインが必要です。");
      alert("投稿にはログインが必要です。");
      return;
    }

     if (!title) {
      setMessage("タイトルを入力してください。");
      return;
    }


    if (!file) {
      setMessage("画像を選択してください。");
      return;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("item")
      .upload(fileName, file);

    if (uploadError) {
      console.error("画像アップロードエラー:", uploadError.message);
      setMessage("画像のアップロードに失敗しました。");
      return;
    }

    const { data: itemData, error: itemError } = await supabase
      .from("second_hand_item")
      .insert([{
        posted_by: userId,
        title,
        description,
        is_free_shipping: isFreeShipping,
        is_open: true,
        is_deleted: false,
      }])
      .select()
      .single();

    if (itemError) {
      setMessage(`投稿に失敗しました: ${itemError.message}\nもしこのエラーが続く場合は、開発者にご連絡いただけますと幸いです。`);
      return;
    }

    const { error: imageError } = await supabase
      .from("item_image")
      .insert([{
        item_id: itemData.id,
        storage_path: fileName,
        is_deleted: false
      }]);

    if (imageError) {
      console.error("画像登録エラー:", imageError.message);
      setMessage("画像情報の保存に失敗しました。");
      return;
    }

    setMessage("🎉 投稿が完了しました！");
    setTitle("");
    setDescription("");
    setIsFreeShipping(true);
    setFile(null);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">不用品を投稿する</h1>

      <div className="mb-4">
        <label className="block font-medium mb-1">タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">説明</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isFreeShipping}
            onChange={(e) => setIsFreeShipping(e.target.checked)}
            className="mr-2"
          />
          送料は受け取り手が負担します
        </label>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">画像（1枚・必須）</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
          className="border rounded p-2"
        />
      </div>

      <div className="mt-6">
        <button
          onClick={handlePost}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          投稿する
        </button>
      </div>

      {message && <p className="mt-4 whitespace-pre-line text-sm text-gray-800">{message}</p>}
    </div>
  );
};

const SecondHandPostPage = () => {
  return (
    <div>
      <SecondHandPostForm />
    </div>
  );
};

export default SecondHandPostPage;
