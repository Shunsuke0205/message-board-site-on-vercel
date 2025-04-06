"use client"

import { createClient } from "@/utils/supabase/client"
import React, { use, useEffect, useState } from "react"

type UserProfileProps = {
  nikename: string;
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
          nikename: data.nikename,
          sex: data.sex,
          selfIntro: data.selfIntro,
          icon: data.icon,
        }
        
        if (data.nikename === null || data.nikename === undefined) {
          setNickname("");
        } else {
          console.log("data.nikename", data.nikename);
          setNickname(data.nikename);
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
    
    const { data, error } = await supabase
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
      console.log("Profile updated:", data);
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
        <p>
          ニックネーム：{(userProfile?.nikename == null) ? "未設定" : userProfile?.nikename}
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
        <form>
          <div>
            <label htmlFor="nickname">
              ニックネーム:
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="ニックネームを入力してください"
              />
            </label>
          </div>
          <div>
            <label htmlFor="sex">
              性別:
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
              自己紹介:
              <textarea
                name="selfIntro"
                id="selfIntro"
                cols={30}
                rows={10}
                value={selfIntro}
                onChange={(e) => setSelfIntro(e.target.value)}
                defaultValue={userProfile?.selfIntro}
                placeholder="自己紹介を入力してください"
              ></textarea>
            </label>
          </div>
          <div>
            <label htmlFor="icon">
              アイコン:
              <select
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
              </select>
            </label>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
          >
            プロフィールを更新する
          </button>
        </form>
      </div>
    )
  );
}

export default EditPage
