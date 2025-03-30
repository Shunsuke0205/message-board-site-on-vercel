import React from "react";
import PostCardList from "./PostCardList";
import PostForm from "./PostForm";

const page = () => {
  return (
    <div>
      <h1>Posts</h1>
      <p>This is the posts page.</p>
      <PostForm />
      <PostCardList />
    </div>
  );
}

export default page;