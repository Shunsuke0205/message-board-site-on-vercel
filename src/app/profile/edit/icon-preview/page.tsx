import React from "react";
import { iconDataList, IconData } from "../iconData";
import Image from "next/image";

const IconPreviewPage = () => {
  return (
    <div>
      <h1 className="mt-4 text-xl ">アイコン一覧</h1>
      <p className="mt-2">
        アイコンは「
        <a 
          href="https://iconbu.com/" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          フリーイラスト・アイコン素材　フリーペンシル
        </a>  
        」様のアイコンを使用させていただいております。
      </p>
      <p className="mt-2 text-sm text-gray-500">
        データ容量の節約のため、アイコンの設定はアップロードではなく選択していただく形とさせていただきます。
      </p>
      <div className="mt-3 flex flex-wrap">
        {iconDataList.map((iconData: IconData) => (
          <div key={iconData.iconNumber} className="mr-3 mt-2 w-1/5 p-2 border-2 border-gray-300 rounded-lg flex flex-col items-center">
            <Image
              src={`/${iconData.Directory}/${iconData.fileName}`}
              alt={iconData.iconName}
              className="rounded-full bg-gray-100"
              width={100}
              height={100}
            />
            <p className="text-center mt-2">{iconData.iconName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IconPreviewPage
