"use client"

import React, { useState } from "react"
import { isLoggedIn } from "../login/actions";

const page = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
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
        ただの個人がひとり親の交流サイトを運営していると怪しまれると思うので、平田の個人情報を置いておきます。<br />
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
        平田が紹介されているサイト</a>
      </p>
      <p>
        私の動機は日本に恩返しをすることです。
        私は広島県広島市で生まれ育ちました。
        大学に進学して今も研究活動をさせていただいている身分なので、
        微力でも社会に恩返しをしたいと思っております。<br />
        先進国の少子化が心配なので、特に結婚・出産・育児を社会全体で支える仕組みに興味があり、私に何ができるかを日々考えています。<br />
        私は先代の資産が後代（子どもやこれから生まれる未来人）に流れる仕組みをつくりたいです。<br />
        例えば「高校生の活動を支援する奨学金（寄付）プラットフォーム」などを作ろうと思っております。<br />

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
              住所：東京都豊島区西巣鴨2-31-7-B-2F3<br />
              職業：大学院生　博士課程1年<br />
              大学：東京大学　工学系研究科　電気系工学専攻<br />
              研究室：川原研究室<br />
              電話番号（ケータイ）：080-2934-1598<br />
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              万が一私が倫理的に悪いことをした場合、私は住まい、仕事、貯金などを失い、社会的な制裁を受けることを覚悟の上でこのサイトを運営します。<br />
              （つまり、倫理に反することを断じてしないと誓います。私は私利私欲のためにこのサービスを運営いたしません。）
            </p>
          </div>
        )}
      </div>
  
    </div>
  )
}

export default page
