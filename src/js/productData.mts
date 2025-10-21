import type {Product} from "./types.mts"
const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res:Response) {
  if (res.ok) {
    return res.json();
  } else {
    if (res.status === 404)
      throw new Error('Product not found');
    else if (res.status === 500)
      throw new Error('There\'s been a server error. Sorry! Please try again later.');
    throw new Error(res.statusText);
  }
}

export function getProducts(url:string) {
  return fetch(baseURL + url)
    .then(convertToJson);
}

export async function findProductById(id:string) {
  const product = await getProducts('products/' + id) as Product;
  console.log(product);
  return product;
}
