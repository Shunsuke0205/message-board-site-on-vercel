import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReplyCount from "./replyCount";
import LocalizedDate from "@/component/LocalTime";
import ReactionButton from "./ReactionButton";

export type PostType = {
  id: string;
  createdAt: string;
  postedBy: string;
  content: string;
  like: number;
  category: number;
  isAcceptReply: boolean;
  isDeleted: boolean;
};

export type PostCardProps = {
  post: PostType;
};

const PostCard = ({ post }: PostCardProps) => {
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
      key={post.id}
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
            [おなまえ]
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {/* {new Date(post.createdAt).toLocaleString()} */}
          <LocalizedDate createdAt={post.createdAt} />
        </span>
      </div>
      <div className="sm:px-13 pb-2">
        <Link href={`/posts/${post.id}`}>
          <p className="whitespace-pre-wrap mt-6">
            {post.content}
          </p>
        </Link>
        <div className="mt-4">
          <span>{repeatEmoji("\u{2764}", post.like)}</span>
        </div>
        <div className="mt-2">
          <ReactionButton post={post} />
        </div>
        <Link href={`/posts/${post.id}`}>
          <div>
            <ReplyCount postId={post.id} />
          </div>
        </Link>
      </div>
    </article>
  )
}

export default PostCard
