import * as utils from "./utils.mts";
import SearchResults from "./components/searchResults.svelte";
import Header from "./components/Header.svelte";
import Footer from "./components/Footer.svelte";

// Mount header and footer (optional but consistent with your other pages)
utils.mountSvelte(Header, "#header");
utils.mountSvelte(Footer, "#footer");

// Get the search term from the URL query string
const searchTerm = utils.getParam("q");

// Mount the SearchResults component
utils.mountSvelte(SearchResults, ".search-results", { q: searchTerm });
