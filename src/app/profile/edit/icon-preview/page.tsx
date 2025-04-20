import React from "react";
import { iconDataList, IconData } from "../iconData";

const IconPreviewPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">アイコン一覧</h1>
      <div className="flex flex-wrap">
        {iconDataList.map((iconData: IconData) => (
          <div key={iconData.iconNumber} className="w-1/5 p-2">
            <img
              src={`/${iconData.Directory}/${iconData.fileName}`}
              alt={iconData.iconName}
              className="rounded-full bg-gray-100"
            />
            <p className="text-center mt-2">{iconData.iconName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IconPreviewPage
