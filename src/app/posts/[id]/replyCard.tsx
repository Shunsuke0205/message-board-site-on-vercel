import Image from "next/image";


export type replyPostType = {
  id: string;
  createdAt: string;
  originalPostId: string;
  postedBy: string;
  content: string;
  like: number;
  isDeleted: boolean;
};

type ReplyCardProps = {
  reply: replyPostType;
};

const ReplyCard = ({ reply }: ReplyCardProps) => {
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
      key={reply.id}
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
            {/* {reply.postedBy} */}
            [おなまえ]
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(reply.createdAt).toLocaleString()}
        </span>
      </div>
      <div className="px-13 pb-2">
        <p className="whitespace-pre-wrap mt-4">
          {reply.content}
        </p>
        <div className="mt-2">
          <span>
            {repeatEmoji("\u{2764}", reply.like)}
          </span>
        </div>
      </div>
    </article>
  )
}

export default ReplyCard
