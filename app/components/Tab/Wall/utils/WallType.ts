export type PostData = {
  profile_img: string;
  problem: string;
  userName: string;
  content: string;
  file: string;
  cheerCount: number;
  commentsCount: number;
  reportCount: number;
  createAt: string; // ISO 날짜 문자열
};

export type CommentData = {
  id: string;
  profile_img: string;
  userName: string;
  content: string;
  time: string; // 예: '5분 전' 이런 표현
  likes: number;
  reports: number;
};
