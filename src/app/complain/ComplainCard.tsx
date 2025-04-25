import LocalizedDate from "@/component/LocalTime";
import { ComplainProps } from "@/utils/postType";
import React from "react"
import ReactionButton from "./ReactionButton";


type ComplainCardProps = {
  complain: ComplainProps;
};

const ComplainCard = ({ complain }: ComplainCardProps) => {
  return (
    <article
      key={complain.id}
      className="border border-gray-300 mt-4 px-4 py-2 "
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          {/* <span>
            <Image
              src="/anonymous_user_icon.png"
              alt="Icon"
              width={40}
              height={40}
              className="rounded-full bg-gray-100"
            />
          </span> */}
          <span className="sm:px-13 text-lg font-bold">
            {complain.name}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {/* {new Date(complain.createdAt).toLocaleString()} */}
          <LocalizedDate createdAt={complain.createdAt} />
        </span>
      </div>
      <div className="sm:px-13 pb-2">
        <p className="whitespace-pre-wrap mt-2">
          {complain.body}
        </p>
        <div className="mt-2">
          <ReactionButton complain={complain} />
        </div>

      </div>
      {/* <div>
        {complain.bad} bad
      </div> */}
    </article>
  )
}

export default ComplainCard
