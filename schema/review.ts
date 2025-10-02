interface Review {
  _id: string;
  productId: string; // id of the product being reviewed
  userId: string;
  rating: number;
  title: string; // title of the review
  body?: string; // User's opinions on the product
  date: number; // could be timestamp (ms since epoch)
}
