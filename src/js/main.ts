import Alert from "./alert.mts"; Alert.init();
import { mount } from "svelte";
// @ts-ignore - Svelte component module declared in vite-env.d.ts
import UserMenu from './components/UserMenu.svelte';

// get the element we want to put the component in
const menuEl = document.querySelector('.user-menu-container');
if(menuEl) {
  mount(UserMenu, { target: menuEl });
}