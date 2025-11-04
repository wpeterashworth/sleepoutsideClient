import Alert from "./alert.mts"; //Alert.init();
import * as utils from "./utils.mts";
// @ts-ignore - Svelte component module declared in vite-env.d.ts
import Header from './components/Header.svelte';
import Footer from './components/Footer.svelte';
import { mountSvelte } from './utils.mts';

mountSvelte(Header, '#header');
mountSvelte(Footer, '#footer');
