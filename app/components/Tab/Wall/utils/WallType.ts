export type PostData = {
  id: string;
  profile_img: string;
  problem: string;
  userName: string;
  content: string;
  file: string;
  cheerCount: number;
  commentsCount: number;
  reportCount: number;
  createAt: string;
};

export type CommentData = {
  id: string;
  profile_img: string;
  userName: string;
  content: string;
  createAt: string;
  likes: number;
  reports: number;
};
