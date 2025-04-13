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
};

export type ReplyProps = PostCommonProps & {
  originalPostId: string;
};

export type ComplainProps = PostCommonProps & {
  category: number;
};

