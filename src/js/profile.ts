import { mount } from "svelte";
import * as utils from "./utils.mts";
import UserMenu from './components/UserMenu.svelte';
import Profile from './components/Profile.svelte';


utils.mountSvelte(UserMenu, '.user-menu-container');
utils.mountSvelte(Profile, '.content');