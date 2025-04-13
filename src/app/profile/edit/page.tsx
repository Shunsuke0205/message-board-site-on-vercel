"use client"

import { createClient } from "@/utils/supabase/client"
import React, { useEffect, useState } from "react"

type UserProfileProps = {
  nickname: string;
  sex: string;
  selfIntro: string;
  icon: number;
}

const EditPage = () => {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [selfIntro, setSelfIntro] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [icon, setIcon] = useState<number>(-1);
  
  // let userProfile: UserProfileType;

  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error("Error fetching user in EditPage:", error);
        setUserId(null);
        return;
      }
      setUserId(data.user.id);
    }
    
    const fetchUserProfile = async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("userId", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile in EditPage:", error);
        return;
      }
      
      if (data) {
        const profile: UserProfileProps = {
          nickname: data.nickname,
          sex: data.sex,
          selfIntro: data.selfIntro,
          icon: data.icon,
        }
        
        if (data.nickname === null || data.nickname === undefined) {
          setNickname("");
        } else {
          setNickname(data.nickname);
        }
        if (data.selfIntro === null || data.selfIntro === undefined) {
          setSelfIntro("");
        } else {
          setSelfIntro(data.selfIntro);
        }
        if (data.sex === null || data.sex === undefined) {
          setSex("");
        } else {
          setSex(data.sex);
        }
        setIcon(data.icon);
        setUserProfile(profile);
      }
    }
    
    fetchUserId();
    if (userId) {
      fetchUserProfile();
    }
  }, [userId, supabase]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert("恐れ入りますが、編集にはログインが必要です。");
      return;
    }
    
    const { error } = await supabase
      .from("profile")
      .update({
        nickname: nickname,
        sex: (sex !== "") ? sex : null,
        selfIntro: selfIntro,
        icon: icon,
      })
      .eq("userId", userId)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating user profile in EditPage:", error);
      alert("プロフィールの更新に失敗しました。");
    } else {
      // succeed in updating
      window.location.reload();
    }
  }


  return (
    (userId === null) ? (
      <div>
        <p>プロフィールを編集するために、まずはログインしてください。</p>
        <p>ログイン後、プロフィールを編集することができます。</p>
      </div>
    ) : (
      <div>
        <h1 className="mt-4 text-lg">現在のプロフィール</h1>
        <div className="mt-2 px-4 py-2 border-2 border-gray-300 rounded-lg">
          <p>
            ニックネーム：{(userProfile?.nickname == null) ? "未設定" : userProfile?.nickname}
          </p>
          <p>
            性別：{(userProfile?.sex == null) ? "未設定" : userProfile?.sex}
          </p>
          <p>
            自己紹介：{userProfile?.selfIntro}
          </p>
          <p>
            アイコン： {(userProfile?.icon === -1) ? "未設定" : userProfile?.icon}
          </p>
        </div>
        <h1 className="mt-4 text-lg">新しいプロフィール</h1>
        <form className="mt-2 px-4 py-2 border-2 border-gray-300 rounded-lg">
          <div>
            <label htmlFor="nickname">
              ニックネーム：
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="ニックネームを入力してください"
                className="
                  ml-2 pb-[2px] 
                  border-b border-gray-500 
                  focus:outline-none focus:border-b-2 focus:pb-[1px]"
              />
            </label>
          </div>
          <div>
            <label htmlFor="sex">
              性別：
              <select
                name="sex"
                id="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="">未設定</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
                <option value="noAnswer">回答しない</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="selfIntro">
              自己紹介：
              <textarea
                name="selfIntro"
                id="selfIntro"
                cols={28}
                rows={5}
                value={selfIntro}
                onChange={(e) => setSelfIntro(e.target.value)}
                defaultValue={userProfile?.selfIntro}
                placeholder="自己紹介を入力してください"
                className="px-2 py-1 border-2 border-gray-300 rounded-lg"
              ></textarea>
            </label>
          </div>
          <div>
            <label htmlFor="icon"
              className="text-gray-500">
              すみません、アイコンの変更は後日実装予定です。&#x1f647;&#x1f3fb;&#x200d;&#x2640;&#xfe0f;
              {/* <select
                name="icon"
                id="icon"
                value={icon}
                onChange={(e) => setIcon(parseInt(e.target.value))}
              >
                <option value="-1">未設定</option>
                <option value="1">アイコン1</option>
                <option value="2">アイコン2</option>
                <option value="3">アイコン3</option>
                <option value="4">アイコン4</option>
              </select> */}
            </label>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            プロフィールを更新する
          </button>
        </form>
      </div>
    )
  );
}

export default EditPage
