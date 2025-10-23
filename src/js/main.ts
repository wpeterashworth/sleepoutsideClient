import Alert from "./alert.mts"; //Alert.init();
import * as utils from "./utils.mts";
// @ts-ignore - Svelte component module declared in vite-env.d.ts
import UserMenu from './components/UserMenu.svelte';

// get the element we want to put the component in
utils.mountSvelte(UserMenu, ".user-menu-container");