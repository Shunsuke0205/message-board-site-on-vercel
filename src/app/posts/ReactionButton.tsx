"use client"

import React, { useState, useEffect } from "react";
import { PostCardProps } from "./PostCard";
import { createClient } from "@/utils/supabase/client";

const ReactionButton = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.like);

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
    console.log("Toggle like button clicked");
    console.log("Current like count:", likeCount);
    const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newLikeCount);
    setIsLiked(!isLiked);
    console.log("New like count:", newLikeCount);

    console.log("Post ID:", post.id);
    await updateLikeCountOnServer(post.id, newLikeCount);
  };

  const updateLikeCountOnServer = async (postId: string, newLikeCount: number) => {
    const { data, error } = await supabase
      .from("reactionToPost")
      .update({ like: newLikeCount })
      .eq("id", postId);

    if (error) {
      console.error("Error updating like count in ReactionButton:", error);
    } else {
      console.log("Like count updated successfully for post ID:", postId);
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
          {emoji} {count}
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
        <div>
          <span
            className={`text-2xl ${isLiked ? "text-red-500" : "text-gray-500"}`}
          >
            {isLiked ? "\u{1F49A}" : "\u{1F49B}"}
          </span>
          <span>{repeatEmoji("\u{2764}", likeCount)}</span>
        </div>
      </button>
    </div>
  );
};

export default ReactionButton;