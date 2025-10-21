import * as utils from "./utils.mts";
import { productDetails } from "./productDetails.mts";
import Header from './components/Header.svelte';
import Footer from './components/Footer.svelte';
import { mountSvelte } from './utils.mts';

mountSvelte(Header, '#header');
mountSvelte(Footer, '#footer');

const ProductId = utils.getParam('product');
if (!ProductId) {
  // replace with 404 in the future?
  window.location.href = '/';
} else {
  productDetails(ProductId, '.product-detail');
}