import React from "react"

export type ComplainType = {
  id: string;
  createdAt: string;
  postedBy: string;
  complain: string;
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
      className="mt-2 ml-2 border"
    >
      <h2>
        {complain.postedBy}
      </h2>
      <p>
        {complain.complain}
      </p>
      <p>
        {new Date(complain.createdAt).toLocaleString()}
      </p>
      <div>
        <span>{repeatEmoji("\u{1F622}", complain.tears)}</span>
        <span>{repeatEmoji("\u{2764}", complain.good)}</span>
        <span>{repeatEmoji("\u{1F4E3}", complain.cheer)}</span>
        
      </div>
      <div>
        {complain.bad} bad
      </div>
    </article>
  )
}

export default ComplainCard
