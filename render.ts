// This file contains the render function

import { getTodoItems } from "./todos";
import { listArea } from "./elements";
import { todoList } from "./storage";

// Function to render the list to the screen
export function render(): void {
  if (todoList.length === 0) {
    listArea.innerHTML = "";
    return;
  }
  listArea.innerHTML = getTodoItems().join("");
}
