import Header from './components/Header.svelte';
import Footer from './components/Footer.svelte';
import { mountSvelte } from './utils.mts';

mountSvelte(Header, '#header');
mountSvelte(Footer, '#footer');