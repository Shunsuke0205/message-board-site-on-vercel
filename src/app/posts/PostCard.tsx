import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReplyCount from "./replyCount";
import LocalizedDate from "@/component/LocalTime";
import ReactionButton from "./ReactionButton";
import DeleteButton from "./DeleteButton";
import { PostProps } from "@/utils/postType";
import iconNumberToSource from "@/utils/iconManeger/iconNumberToSource";


export type PostCardProps = {
  post: PostProps;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <article
      key={post.id}
      className="border border-gray-300 mt-4 px-4 py-2 "
    >
      <div className="flex justify-between items-start">
        <Link href={`/profile/${post.postedBy}`}>
          <div className="flex items-center">
            <span>
              <Image
                src={iconNumberToSource(post.profile?.icon)}
                alt="Icon"
                width={60}
                height={60}
                className="rounded-full 
                  border-3 border-gray-300"
              />
            </span>
            <span className="ml-3 text-lg font-bold">
              {post.profile?.nickname == null ? "[おなまえ]" : post.profile?.nickname}
            </span>
          </div>
        </Link>
        <span className="text-sm text-gray-500">
          {/* {new Date(post.createdAt).toLocaleString()} */}
          <LocalizedDate createdAt={post.createdAt} />
        </span>
      </div>
      <div className="sm:px-8 pb-2">
        <Link href={`/posts/${post.id}`}>
          <p className="whitespace-pre-wrap mt-4">
            {post.body}
          </p>
        </Link>
        <div className="mt-2">
          <ReactionButton post={post} />
        </div>
        <Link href={`/posts/${post.id}`}>
          <div>
            <ReplyCount postId={post.id} />
          </div>
        </Link>
        <DeleteButton post={post} tableName="post" />
      </div>
    </article>
  )
}

export default PostCard
