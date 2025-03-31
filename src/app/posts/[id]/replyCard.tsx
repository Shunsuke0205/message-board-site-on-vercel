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
    >
      <div>
        <div>
          <span>
            <Image
              src="/anonymous_user_icon.png"
              alt="Icon"
              width={40}
              height={40}
              className="rounded-full bg-gray-100"
            />
          </span>
          <span>
            {reply.postedBy}
          </span>
          <span>
            {new Date(reply.createdAt).toLocaleString()}
          </span>
        </div>
        <div>
          <p>
            {reply.content}
          </p>
          <div>
            <span>
              {repeatEmoji("\u{2764}", reply.like)}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ReplyCard
