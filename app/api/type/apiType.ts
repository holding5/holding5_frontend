export interface Post {
  id: number;
  category: string;
  anonymity: boolean;
  content: string;
  authorName: string;
  likeCount: number;
  reportCount: number;
  commentCount: number;
  activated: boolean;
  mediaUrls: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedPostsResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Post[];
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
  sort: any;
  pageable: any;
}

export interface PostDetailResponse {
  post: Post;
  comments: Comment[];
  commentPage: number;
  totalCommentPages: number;
}

export interface Comment {
  id: number;
  content: string;
  authorName: string;
  anonymity: boolean;
  createdAt: string;
  updatedAt: string;
  parentId: number | null;
}

export interface NewPostPayload {
  userId: number;
  category: string;
  anonymity: boolean;
  content: string;
  mediaUrls: string[] | null;
  severity?: string; // 옵션 필드는 `?`를 붙입니다.
  state?: string;
  religion?: string;
  fromHolding?: boolean;
  tags?: string[];
  hasBeforeStory?: boolean;
  beforeStoryPostId?: number;
}

export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  success: boolean;
}

export interface PatchPost {
  content: string;
  mediaUrls: string;
}
