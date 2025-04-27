import Image from "next/image";
import DeleteButton from "../DeleteButton";
import { ReplyProps } from "@/utils/postType";
import Link from "next/link";
import iconNumberToSource from "@/utils/iconManeger/iconNumberToSource";




export type ReplyCardProps = {
  reply: ReplyProps;
};

const ReplyCard = ({ reply } : ReplyCardProps) => {
  return (
    <article
      key={reply.id}
      className="border border-gray-300 mt-4 px-4 py-2 "
    >
      <div className="flex justify-between items-start">
        <Link href={`/profile/${reply.postedBy}`}>
          <div className="flex items-center">
            <span>
              <Image
                src={iconNumberToSource(reply.profile?.icon)}
                alt="Icon"
                width={40}
                height={40}
                className="rounded-full bg-gray-100"
              />
            </span>
            <span className="ml-3 text-lg font-bold">
              {reply.profile?.nickname == null ? "[おなまえ]" : reply.profile?.nickname}
            </span>
          </div>
        </Link>
        <span className="text-sm text-gray-500">
          {new Date(reply.createdAt).toLocaleString()}
        </span>
      </div>
      <div className="px-13 pb-2">
        <p className="whitespace-pre-wrap mt-4">
          {reply.body}
        </p>
        <div className="mt-2">
          {/* <span>
            {repeatEmoji("\u{2764}", reply.like)}
          </span> */}
        </div>
        <DeleteButton post={reply} tableName="replyToPost" />
      </div>
    </article>
  )
}

export default ReplyCard
