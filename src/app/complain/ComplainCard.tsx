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
};

type ComplainCardProps = {
  complain: ComplainType;
};

const ComplainCard = ({ complain }: ComplainCardProps) => {
  return (
    <article
      key={complain.id}
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
        <span>{complain.tears} tears</span>
        <span>{complain.good} good</span>
        <span>{complain.cheer} cheer</span>
        <span>{complain.bad} bad</span>
      </div>
    </article>
  )
}

export default ComplainCard