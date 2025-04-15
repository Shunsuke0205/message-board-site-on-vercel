"use client"

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ComplainProps } from "@/utils/postType";

type ComplainCardProps = {
  complain: ComplainProps;
}

const ReactionButton = ({ complain }: ComplainCardProps) => {
  const [isTeared, setIsTeared] = useState(false);
  const [isHearted, setIsHearted] = useState(false);
  const [isCheered, setIsCheered] = useState(false);
  const [tearCount, setTearCount] = useState(complain.reaction?.tear || 1);
  const [heartCount, setHeartCount] = useState(complain.reaction?.heart || 1);
  const [cheerCount, setCheerCount] = useState(complain.reaction?.cheer || 1);

  const supabase = createClient();


  const toggleTear = async () => {
    const newTearCount = isTeared ? tearCount - 1 : tearCount + 1;
    setTearCount(newTearCount);
    setIsTeared(!isTeared);

    await updateTearCountOnServer(complain.id, newTearCount);
  };

  const toggleHeart = async () => {
    const newHeartCount = isHearted ? heartCount - 1 : heartCount + 1;
    setHeartCount(newHeartCount);
    setIsHearted(!isHearted);

    await updateHeartCountOnServer(complain.id, newHeartCount);
  };

  const toggleCheer = async () => {
    const newCheerCount = isCheered ? cheerCount - 1 : cheerCount + 1;
    setCheerCount(newCheerCount);
    setIsCheered(!isCheered);

    await updateCheerCountOnServer(complain.id, newCheerCount);
  };
 
  const updateTearCountOnServer = async (complainId: string, newTearCount: number) => {
    const { error } = await supabase
      .from("reactionToComplain")
      .update({ tear: newTearCount })
      .eq("id", complainId);

    if (error) {
      console.error("Error updating tear count in ReactionButton:", error);
    }
  };

  const updateHeartCountOnServer = async (complainId: string, newHeartCount: number) => {
    const { error } = await supabase
      .from("reactionToComplain")
      .update({ heart: newHeartCount })
      .eq("id", complainId);

    if (error) {
      console.error("Error updating heart count in ReactionButton:", error);
    }
  };

  const updateCheerCountOnServer = async (complainId: string, newCheerCount: number) => {
    const { error } = await supabase
      .from("reactionToComplain")
      .update({ cheer: newCheerCount })
      .eq("id", complainId);

    if (error) {
      console.error("Error updating cheer count in ReactionButton:", error);
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
        onClick={toggleTear}
        className="cursor-pointer"
      >
        <div 
          className={`
            px-3 py-1 mr-3
            border-1 border-gray-300
            rounded-xl
            ${isTeared ? "bg-red-100" : "bg-gray-100"}`}
        >
          <span>わかる</span>
          <span className="ml-1">
            {repeatEmoji("\u{1F622}", tearCount)}</span>
        </div>
      </button>
      <button 
        onClick={toggleHeart}
        className="cursor-pointer"
      >
        <div 
          className={`
            px-3 py-1 mr-3
            border-1 border-gray-300
            rounded-xl
            ${isHearted ? "bg-red-100" : "bg-gray-100"}`}
        >
          <span>スキ</span>
          <span className="ml-1">
            {repeatEmoji("\u{1F497}", heartCount)}</span>
        </div>
      </button>
      <button 
        onClick={toggleCheer}
        className="cursor-pointer"
      >
        <div 
          className={`
            px-3 py-1
            border-1 border-gray-300
            rounded-xl
            ${isCheered ? "bg-red-100" : "bg-gray-100"}`}
        >
          <span>エール</span>
          <span className="ml-1">
            {repeatEmoji("\u{1F4E3}", cheerCount)}</span>
        </div>
      </button>
      </div>
  );
};

export default ReactionButton;
