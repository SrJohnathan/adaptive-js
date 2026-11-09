export type Post = {
  id: number;
  author: string;
  handle: string;
  time: string;
  body: string;
  replies: number;
  reposts: number;
  likes: number;
  avatar: string;
};

export type Community = {
  label: string;
  members: string;
  description: string;
};
