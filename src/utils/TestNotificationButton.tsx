"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function TestNotificationButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  const handleTestPush = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const { data: userDara, error: userError } = await supabase.auth.getUser();
      if (userError || !userDara.user) {
        throw new Error("ログインが必要です");
      }

      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) {
        throw new Error("セッションが見つかりません");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-test-notification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "テスト通知を送信しました！" });
      } else {
        const errorText = response.status === 404 
          ? "通知の登録情報が見つかりません。先に通知を許可してください。" 
          : result.error || "送信に失敗しました";
        throw new Error(errorText);
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-sm font-bold text-gray-700">通知テスト</h3>
      <p className="text-xs text-gray-500 text-center">
        正しく設定されているか、自分宛てにテスト通知を送ります。
      </p>

      <button
        onClick={handleTestPush}
        disabled={isLoading}
        className={`px-6 py-2 rounded-full text-white font-medium transition-all ${
          isLoading 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-700 active:scale-95"
        }`}
      >
        {isLoading ? "送信中..." : "テスト通知を送る"}
      </button>

      {message && (
        <p className={`text-xs mt-2 font-medium ${
          message.type === "success" ? "text-green-600" : "text-red-600"
        }`}>
          {message.text}
        </p>
      )}
    </div>
  );
}