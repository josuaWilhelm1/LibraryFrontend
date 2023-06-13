// BookData Model for HTTP Put/Post requests
export interface BookData {
  title: string;
  author: {
    id: number;
  }
  genre: string;
}
