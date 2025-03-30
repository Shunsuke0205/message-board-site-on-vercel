import React from "react";

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
    <article
      key={post.id}
      className="mt-2 ml-2 border"
    >
      <h2>
        {post.postedBy}
      </h2>
      <p className="whitespace-pre-wrap">
        {post.content}
      </p>
      <p>
        {new Date(post.createdAt).toLocaleString()}
      </p>
      <div>
        <span>{repeatEmoji("\u{2764}", post.like)}</span>
      </div>
    </article>
  )
}

export default PostCard
