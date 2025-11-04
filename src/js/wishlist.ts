import * as utils from "./utils.mts";
import Header from './components/Header.svelte';
import Footer from './components/Footer.svelte';
import Wishlist from "./components/Wishlist.svelte";

utils.mountSvelte(Header, '#header');
utils.mountSvelte(Footer, '#footer');

utils.mountSvelte(Wishlist, ".wishlist-parent");
