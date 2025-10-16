import { mount } from "svelte";
import UserMenu from './components/UserMenu.svelte';

// get the element we want to put the component in
const menuEl = document.querySelector('.user-menu-container');
// check to make sure it exists
if(menuEl) {
    mount(UserMenu, {
        target: menuEl
    });
}
