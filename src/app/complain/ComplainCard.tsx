import Image from "next/image";
import React from "react"

export type ComplainType = {
  id: string;
  createdAt: string;
  name: string;
  body: string;
  tears: number;
  good: number;
  cheer: number;
  bad: number;
  category: number;
};

type ComplainCardProps = {
  complain: ComplainType;
};

const ComplainCard = ({ complain }: ComplainCardProps) => {
  const repeatEmoji = (emoji: string, count: number) => {
    if (count >= 1 && count <= 10) {
      return (
        <span>
          {emoji.repeat(count)}
        </span>
      )
    } else {
      return (
        <span>
          {emoji} {count}
        </span>
      )
    }
  }

  return (
    <article
      key={complain.id}
      className="border border-gray-300 mt-4 px-4 py-2 "
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <span>
            <Image
              src="/anonymous_user_icon.png"
              alt="Icon"
              width={40}
              height={40}
              className="rounded-full bg-gray-100"
            />
          </span>
          <span className="ml-3 text-lg font-bold">
            {complain.name}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(complain.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="whitespace-pre-wrap mt-2">
        {complain.body}
      </p>
      <div className="mt-2">
        <span>{repeatEmoji("\u{1F622}", complain.tears)}</span>
        <span>{repeatEmoji("\u{2764}", complain.good)}</span>
        <span>{repeatEmoji("\u{1F4E3}", complain.cheer)}</span>
      </div>
      {/* <div>
        {complain.bad} bad
      </div> */}
    </article>
  )
}

export default ComplainCard
