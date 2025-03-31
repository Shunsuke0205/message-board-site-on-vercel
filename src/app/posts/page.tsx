import React, { Suspense } from "react";
import PostCardList from "./PostCardList";
import PostForm from "./PostForm";

const page = () => {
  return (
    <div>
      <PostForm />
      <Suspense fallback={<p>Loading posts...</p>}>
        <PostCardList />
      </Suspense>
    </div>
  );
}

export default page;