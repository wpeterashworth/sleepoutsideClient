import * as utils from "./utils.mts";
import ProductList from "./components/ProductList.svelte";
import Header from './components/Header.svelte';
import Footer from './components/Footer.svelte';
import { mountSvelte } from './utils.mts';

// get category from query string
const category = utils.getParam("category");

mountSvelte(Header, '#header');
mountSvelte(Footer, '#footer');
utils.mountSvelte(ProductList, ".products", { category: category });