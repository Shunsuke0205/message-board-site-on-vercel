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
        <p className="mt-2 text-gray-900">
          教えて欲しいこと、聞いて欲しいこと、日々のつぶやき、<br />
          なんでもひとり親どうし共有しましょう。
        </p>
        <div className="mt-2 text-sm text-gray-500 flex flex-col items-center">
          <p>
            &#x26a0;&#xfe0f;ご注意&#x26a0;&#xfe0f;<br />
          </p>
          <p>
            削除や編集する機能は未完成なのでご注意ください。<br />
            投稿を削除したい場合は、平田駿輔（運営者。en4singleparents@gmail.com）までご連絡ください。&#x1f647;&#x1f3fb;&#x200d;&#x2640;&#xfe0f;
          </p>

        </div>
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