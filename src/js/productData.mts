import type {Product} from "./types.mts"
const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res:Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(url:string) {
  return fetch(baseURL + url)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id:string) {
  const product = await getData('products/' + id) as Product;
  console.log(product);
  return product;
}
