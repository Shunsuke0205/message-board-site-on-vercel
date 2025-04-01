import React, { Suspense } from "react";
import PostCardList from "./PostCardList";
import PostForm from "./PostForm";

const page = () => {
  return (
    <div>
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