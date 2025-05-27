export type Profile = {
  nickname: string;
  icon: number;
};

export type CommentProps = {
  id: string;
  createdAt: string;
  itemId: string;
  postedBy: string;
  body: string;
  isDeleted: boolean;
  profile: Profile;
};
