<script>
import * as utils from "../utils.mts";
import Cart from "./Cart.svelte";
import UserMenu from "./UserMenu.svelte";
</script>

<header class="divider">
    <div class="logo">
    <img src="/images/noun_Tent_2517.svg" alt="tent logo" />
    <a href="/"> Sleep<span class="highlight">Outside</span></a>
    </div>
    <nav class="menu-right">
    <div class="user-menu-container">
        <UserMenu />
    </div>
    </nav>
</header>