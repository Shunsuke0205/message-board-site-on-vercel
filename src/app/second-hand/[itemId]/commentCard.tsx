import Image from "next/image";
// import DeleteButton from "../DeleteButton";
import Link from "next/link";
import iconNumberToSource from "@/utils/iconManeger/iconNumberToSource";
import LocalizedDate from "@/component/LocalTime";
import { CommentProps } from "./type";


type CommentCardProps = {
  comment: CommentProps;
};

const CommentCard = ({ comment } : CommentCardProps) => {
  return (
    <article
      key={comment.itemId}
      className="border border-gray-300 mt-4 px-4 py-2 "
    >
      <div className="flex justify-between items-start">
        <Link href={`/profile/${comment.postedBy}`}>
          <div className="flex items-center">
            <span>
              <Image
                src={iconNumberToSource(comment.profile?.icon)}
                alt="Icon"
                width={40}
                height={40}
                className="rounded-full bg-gray-100"
              />
            </span>
            <span className="ml-3 text-lg font-bold">
              {comment.profile?.nickname == '' ? "[おなまえ]" : comment.profile?.nickname}
            </span>
          </div>
        </Link>
        <span className="text-sm text-gray-500">
          <LocalizedDate createdAt={comment.createdAt} />
        </span>
      </div>
      <div className="px-13 pb-2">
        <p className="whitespace-pre-wrap mt-4">
          {comment.body}
        </p>
        {/* <DeleteButton post={reply} tableName="replyToPost" /> */}
      </div>
    </article>
  )
}

export default CommentCard;
