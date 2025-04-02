import React, { Suspense } from "react";
import PostCardList from "./PostCardList";
import PostForm from "./PostForm";
import Image from "next/image";

const page = () => {
  const Explanation = () => {
    return (
      <div className="mt-4 flex flex-col items-center ">
        <div className="flex items-center">
          <Image
            src="/posts_icon.png"
            alt="Icon"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className="ml-4 text-xl font-bold">
            心のヘルプ
          </h1>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          教えて欲しいこと、聞いて欲しいこと、日々のつぶやき、<br />
          なんでもひとり親どうし共有しましょう。
        </p>
      </div>
    )
  }
  return (
    <div>
      <Explanation />
      <Suspense fallback={<p>Loading form...</p>}>
        <PostForm />
      </Suspense>
      <Suspense fallback={<p>Loading posts...</p>}>
        <PostCardList />
      </Suspense>
    </div>
  );
}

export default page;