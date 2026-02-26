// This file contains the add, delete, complete and getTodoItems functions
import { Todo } from "./types";
import { render } from "./render";
import { addBtn, todoInput } from "./elements";
import {
  setTodoList,
  setLocalStorage,
  addToCompletedList,
  addToDeletedList,
  addToTodoList,
  todoList,
} from "./storage";

// Event listener for the addBtn button
addBtn.addEventListener("click", addTodoItem);

// If the user presses enter, add the item to the list
todoInput.addEventListener("keypress", function (event: KeyboardEvent) {
  if (event.key === "Enter") {
    addTodoItem();
  }
});

// Event listener to get the id of the clicked item
document.addEventListener("click", function (event: MouseEvent): void {
  const target = event.target as Element;
  const button = target.closest("button");
  // Return if the target is not a button
  if (button === null) return;
  // Check if the button is the complete or delete button
  if (button.classList.contains("btn-complete")) {
    completeTodoItem(button.getAttribute("data-id") ?? "");
  } else {
    deleteTodoItem(button.getAttribute("data-id") ?? "");
  }
});

// Function to add item to the list and then call the render function
export function addTodoItem(): void {
  // Stop if the input is empty
  if (todoInput.value.trim() === "") {
    todoInput.focus();
    todoInput.value = "";
    todoInput.classList.add("input-error");
    todoInput.placeholder = "Please input a valid item";
    return;
  }
  // Remove the error classes if they exist
  if (todoInput.classList.contains("input-error")) {
    todoInput.classList.remove("input-error");
    todoInput.placeholder = "Add Item";
  }
  // creates random id and adds the object to the todoList array
  addToTodoList({ id: crypto.randomUUID(), text: todoInput.value });
  // Clears the input field
  todoInput.value = "";
  // Sets focus back to the input field
  todoInput.focus();
  // Set local storage and render
  setLocalStorage();
  render();
}

// Function to delete an item from the list
export function deleteTodoItem(id: string): void {
  for (const item of todoList) {
    if (item.id === id) {
      addToDeletedList(item);
    }
  }
  // Filter the list to remove the item with the matching id
  setTodoList(
    todoList.filter(function (item: Todo): boolean {
      return item.id !== id;
    }),
  );
  // Set local storage and render
  setLocalStorage();
  render();
}

export function completeTodoItem(id: string): void {
  // Add the item with the matching id to the completed list
  for (const item of todoList) {
    if (item.id === id) {
      addToCompletedList(item);
    }
  }
  // Remove the item from the todoList
  setTodoList(todoList.filter((item: Todo) => item.id !== id));
  // Set local storage and render
  setLocalStorage();
  render();
}

// Function to get the array of HTML strings for each list item and supply it to the render function
export function getTodoItems(): string[] {
  // Stop if the list is empty
  if (todoList.length === 0) return [];
  return todoList.map(function (item: Todo): string {
    return `
    <li class="flex place-content-between items-start bg-gray-700 rounded-md mb-4 p-2">  
        <div class="flex gap-2">
            <button data-id="${item.id}" class="flex justify-center items-center cursor-pointer rounded-md size-8 p-2 border-2 border-green-800 btn-complete" id="btn" aria-label="mark todo item as complete">
                <svg class="size-4 fill-green-800 icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>
            </button>
            ${item.text}
        </div>
        <button data-id="${item.id}" class="flex justify-center items-center cursor-pointer rounded-md size-8 p-2 border-2 border-red-800 btn-delete" id="btn" aria-label="delete todo item">
            <svg class="size-4 fill-red-800 icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>
        </button>
    </li>`;
  });
}
