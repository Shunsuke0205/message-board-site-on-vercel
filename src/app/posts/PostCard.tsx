import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReplyCount from "./replyCount";

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

type PostCardProps = {
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
    <Link href={`/posts/${post.id}`}>
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
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="sm:px-13 pb-2">
          <p className="whitespace-pre-wrap mt-4">
            {post.content}
          </p>
          <div className="mt-2">
            <span>{repeatEmoji("\u{2764}", post.like)}</span>
          </div>
          <div>
            <ReplyCount postId={post.id} />
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PostCard
