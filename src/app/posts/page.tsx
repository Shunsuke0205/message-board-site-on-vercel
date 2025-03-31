import React from "react";
import PostCardList from "./PostCardList";
import PostForm from "./PostForm";

const page = () => {
  return (
    <div>
      <PostForm />
      <PostCardList />
    </div>
  );
}

export default page;