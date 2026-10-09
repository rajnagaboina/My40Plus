export type Wish = {
  id: string;
  author: string;
  message: string;
  media?: { name: string; type: string; size: number };
  reactions: number;
  createdAt: string;
};

export type NewWish = Pick<Wish, "author" | "message" | "media">;
