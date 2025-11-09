import * as utils from "./utils.mts";
import type {Product} from "./types.mts"


export async function getProducts(url:string) {
  const {error, data} = await utils.getJSONData(url);
  if(error) throw new Error(error);
  return data;
}

export async function findProductById(id:string) {
  const product = await getProducts('/products/' + id) as Product;
  console.log(product);
  return product;
}

export async function getRecommendedProducts(id:string) {
  const response = await getProducts(`/products/${id}/recommended`);
  // API might return { results: Product[] } or just Product[]
  return Array.isArray(response) ? response : (response.results || response.data || []);
}