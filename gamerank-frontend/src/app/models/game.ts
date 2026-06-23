export interface Review {
  id: string;
  gameId: string;
  author: string;
  content: string;
  rating: number;
  date: string | number[];
}

export interface Game {
  id: string;
  title: string;
  genre: string;
  developer: string;
  reviews: Review[];
}
