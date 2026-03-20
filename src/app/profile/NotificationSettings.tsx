"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { subscribeToPushNotifications } from "@/utils/webPush";



type Props = {
  userId: string;
  initialPostNotificationEnabled: boolean;
  initialDMNotificationEnabled: boolean;
};

export default function NotificationSettings({
  userId,
  initialPostNotificationEnabled,
  initialDMNotificationEnabled,
}: Props) {
  const [postNotificationEnabled, setPostNotificationEnabled] = useState(initialPostNotificationEnabled);
  const [DMNotificationEnabled, setDMNotificationEnabled] = useState(initialDMNotificationEnabled);

  const handleToggle = async (type: "post" | "dm", currentValue: boolean) => {
    const newValue = !currentValue;
    if (type === "post") {
      setPostNotificationEnabled(newValue);
    } else if (type === "dm") {
      setDMNotificationEnabled(newValue);
    }

    if (newValue) {
      const subscribed = await subscribeToPushNotifications(userId);
      if (!subscribed) {
        alert("申し訳ありません、通知の設定に失敗しました。ブラウザの設定を確認していただけますか。");
        if (type === "post") {
          setPostNotificationEnabled(false);
        } else if (type === "dm") {
          setDMNotificationEnabled(false);
        }
        return;
      }
    }


    const updateData = (type === "post")
      ? { "allowPostNotifications": newValue }
      : { "allowDMNotifications": newValue };

    const supabase = createClient();
    await supabase.from("profile").update(updateData).eq("userId", userId);
  };

  return (
    <div className="pt-2 border-gray-200">
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div>
            <span className="block font-medium text-sm">ポスト投稿通知</span>
            <span className="text-xs text-gray-500">もし新しい投稿があったら、21時に通知がスマホに届きます。</span>
          </div>
          <button 
            onClick={() => handleToggle("post", postNotificationEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative ${postNotificationEnabled ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${postNotificationEnabled ? "left-7" : "left-1"}`} />
          </button>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div>
            <span className="block font-medium text-sm">DM受信通知</span>
            <span className="text-xs text-gray-500">メッセージが届いたら即座に通知がスマホに届きます。</span>
          </div>
          <button 
            onClick={() => handleToggle("dm", DMNotificationEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative ${DMNotificationEnabled ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${DMNotificationEnabled ? "left-7" : "left-1"}`} />
          </button>
        </div>
      </div>
    </div>
  );
}