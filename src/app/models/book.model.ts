// Book model for components and HTTP Get requests
export interface Book {
  id: number;
  title: string;
  author: {
    id: number;
    name: string;
  };
  genre: string;
  available: boolean;
  rentalCount: number;
}
