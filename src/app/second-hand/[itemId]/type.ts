export type Profile = {
  userId: string;
  nickname: string;
  icon: number;
};

export type CommentProps = {
  id: number;
  createdAt: string;
  itemId: string;
  postedBy: string;
  body: string;
  isDeleted: boolean;
  profile: Profile;
}