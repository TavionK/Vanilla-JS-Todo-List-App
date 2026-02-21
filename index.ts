// Main ts file
import { render } from "./render.js";
import { getLocalStorage } from "./storage.js";

// Load the items from local storage and render the list upon loading
getLocalStorage();
render();
