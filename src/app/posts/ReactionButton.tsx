"use client"

import React, { useState, useEffect } from "react";
import { PostCardProps } from "./PostCard";
import { createClient } from "@/utils/supabase/client";

const ReactionButton = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const supabase = createClient();

  useEffect(() => {
    const fetchLikeCount = async (postId: string) => {
      const { data, error } = await supabase
        .from("reactionToPost")
        .select("like")
        .eq("id", postId)
        .single();

      if (error) {
        console.error("Error fetching like count:", error);
        return;
      }
      setLikeCount(data.like);
    };

    fetchLikeCount(post.id);
  }, [post.id, supabase]);

  const toggleLike = async () => {
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newLikeCount);
    setIsLiked(!isLiked);

    await updateLikeCountOnServer(post.id, newLikeCount);
  };

  const updateLikeCountOnServer = async (postId: string, newLikeCount: number) => {
    const { error } = await supabase
      .from("reactionToPost")
      .update({ like: newLikeCount })
      .eq("id", postId);

    if (error) {
      console.error("Error updating like count in ReactionButton:", error);
    }
  };

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
          {emoji} x {count}
        </span>
      )
    }
  }



  return (
    <div>
      <button 
        onClick={toggleLike}
        className="cursor-pointer"
      >
        <div 
          className={`
            px-3 py-1
            border-1 border-gray-300
            rounded-xl
            ${isLiked ? "bg-red-100" : "bg-gray-100"}`}
        >
          <span>{repeatEmoji("\u{1F497}", likeCount)}</span>
        </div>
      </button>
    </div>
  );
};

export default ReactionButton;
