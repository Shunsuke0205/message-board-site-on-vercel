"use client"

import React, { useState } from "react"
import { isLoggedIn } from "../login/actions";

const AboutShunsuke = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = async () => {
    const isloggedin = await isLoggedIn(); 
    if (!isloggedin) {
      alert("ボタンを押してくださりありがとうございます。\n恐れ入りますが、個人情報なのでログインされた方に公開しております。");
      return;
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-6">
      <p>
        はじめまして、平田駿輔と申します。<br />
        ただの個人がひとり親の交流サイトを運営していても怪しいと思うので、平田の個人情報を置かせていただきます。<br />
      </p>
      <p>
        <a 
          href="https://www.akg.t.u-tokyo.ac.jp/member"
          target="_blank"
          className="text-blue-500 hover:text-blue-700">
            平田が所属している研究室
        </a><br />
        <a 
          href="https://www.eeis.t.u-tokyo.ac.jp/interview/voices/hirata-eeic/"
          target="_blank"
          className="text-blue-500 hover:text-blue-700">
        平田が紹介されている大学のサイト</a>
      </p>
      <p>
        私の動機は日本に恩返しをすることです。
        私は広島県広島市で生まれ育ちました。
        大学に進学して今も研究活動をさせていただいている身分なので、
        微力でも社会に恩返しをしたいと思っております。<br />
        先進国の少子化が心配なので、特に結婚・出産・育児を社会全体で支える仕組みづくりに関心があり、私に何ができるかを日々考えています。<br />
        私はいつか、先代の資産が後代（子どもやこれから生まれる未来人）に流れる仕組みをつくりたいです。<br />
        例えば「高校生の活動を支援する奨学金（寄付）プラットフォーム」などを作ろうと思っております（これは2025年中につくり始めたいです）。<br />
      </p>
      <div className="max-w-md mx-auto my-4 p-4 border rounded shadow">
        <button
          onClick={toggleExpand}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          {isExpanded ? "とじる" : "ひらく（平田駿輔の住所・職場・電話番号）"}
        </button>
        {isExpanded && (
          <div className="mt-2 text-gray-700">
            <p>
              名前：平田駿輔（ひらたしゅんすけ）<br />
              出身：広島県広島市<br />
              生年月日：1999年2月5日（27歳）<br />
              性別：男<br />
              住所：東京都豊島区西巣鴨2-31-7-B-2F3<br />
              職業：大学院生　博士課程2年<br />
              大学：東京大学　工学系研究科　電気系工学専攻<br />
              研究室：川原研究室<br />
              電話番号（ケータイ）：090-3757-1183<br />
            </p>
            <p className="mt-8 text-gray-500 text-sm">
              私、平田駿輔は私利私欲のためにこのサービスを運営せず、ユーザーのみなさまのために運営することを誓います。<br />
              <br />
              私が自分の個人情報を公開している理由は、仮に私が倫理的または道徳的に悪いことをしたら、私は訴えられて社会的な制裁（住まいや仕事を失う）を受けると思うからです。
              <br />
              みなさんがやろうと思えば私に制裁を加えることができる状態を作っておけば、少しでも安心してサービスを使っていただけるのではないかと思い、公開しております。<br />
            </p>
          </div>
        )}
      </div>
  
    </div>
  )
}

export default AboutShunsuke
