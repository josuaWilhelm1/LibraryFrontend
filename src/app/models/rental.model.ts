export interface Rental {
  id: number;
  book: {
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
  returnDate: Date;
  returned: Boolean;
}
