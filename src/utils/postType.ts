export type PostCommonProps = {
  id: string;
  createdAt: string;
  postedBy: string;
  body: string;
  isDeleted: boolean;
  profile?: {
    nickname: string;
    icon: number;
  }
};

export type PostProps = PostCommonProps & {
  category: number;
  isAcceptReply: boolean;
  reactionToPost: {
    like: number;
  }
};

export type ReplyProps = PostCommonProps & {
  originalPostId: string;
  reactionToReply: {
    like: number;
  }
};

export type ComplainProps = {
  id: string;
  createdAt: string;
  name: string;
  body: string;
  bad: number;
  category: number;
  reaction?: {
    tear: number;
    heart: number;
    cheer: number;
  };
}

export type ReactionToPostProps = {
  id: string;
  like: number;
}