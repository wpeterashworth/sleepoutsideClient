interface Product {
  image: string;   // URL
  name: string;
  quantity: number;
  price: number;
  brand?: string;
}

interface User {
  _id: string;
  firstName: string; // User's first name
  lastName: string;  // User's last name
  email: string;     // User email (unique)
  password: string;  // User password
  cart: Product[];   // Array of products in user's cart
  wishlist: string[]; // Array of productIds in user's wishlist
  Auth_ID?: string;   // Result from auth login (unique)
}
