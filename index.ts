interface Todo {
  id: string;
  text: string;
}

const listArea = document.getElementById("list-area") as HTMLUListElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const todoInput = document.getElementById("todo-input") as HTMLInputElement;

// Array of item objects that will be added to and rendered
let todoList: Todo[] = [];
let completedList: Todo[] = [];
let deletedList: Todo[] = [];

// Event listener to get the id of the clicked item
document.addEventListener("click", function (event) {
  // Return if the target is not a button
  if (event.target.closest("button") === null) return;
  // Check if the button is the complete or delete button
  if (event.target.closest("button").classList.contains("btn-complete")) {
    completeTodoItem(event.target.closest("button").getAttribute("data-id"));
  } else {
    deleteTodoItem(event.target.closest("button").getAttribute("data-id"));
  }
});

// Event listener for the addBtn button
addBtn.addEventListener("click", addTodoItem);

// If the user presses enter, add the item to the list
todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTodoItem();
  }
});

// Function to delete an item from the list
function deleteTodoItem(id: string): void {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      deletedList.push(todoList[i]);
    }
  }
  // Filter the list to remove the item with the matching id
  todoList = todoList.filter(function (item: Todo): boolean {
    return item.id !== id;
  });
  // Saves the list to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem("deletedList", JSON.stringify(deletedList));
  render();
}

function completeTodoItem(id: string): void {
  // Add the item with the matching id to the completed list
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      completedList.push(todoList[i]);
    }
  }
  // Remove the item from the todoList
  todoList = todoList.filter(function (item: Todo): boolean {
    return item.id !== id;
  });
  // Saves the updated list to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem("completedList", JSON.stringify(completedList));
  render();
}

// Function to add item to the list and then call the render function
function addTodoItem(): void {
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
  todoList.push({ id: crypto.randomUUID(), text: todoInput.value });
  // Clears the input field
  todoInput.value = "";
  // Sets focus back to the input field
  todoInput.focus();
  // Saves the list to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
  render();
}

// Function to get the array of HTML strings for each list item and supply it to the render function
function getTodoItems(): string[] {
  // Stop if the list is empty
  if (todoList.length === 0) return [];
  return todoList.map(function (item: Todo): string {
    return `
    <li>
        ${item.text}
        <div class="btn-container">
            <button data-id="${item.id}" class="btn btn-complete" id="btn" aria-label="mark todo item as complete">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>
            </button>
            <button data-id="${item.id}" class="btn btn-delete" id="btn" aria-label="delete todo item">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>
            </button>
        </div>
    </li>`;
  });
}

// Function to get the items from local storage
function getLocalStorage(): void {
  const todoStored: string | null = localStorage.getItem("todoList");
  const completedStored: string | null = localStorage.getItem("completedList");
  const deletedStored: string | null = localStorage.getItem("deletedList");
  // Return if there is no local storage
  if (todoStored !== null) {
    todoList = JSON.parse(todoStored);
  }
  if (completedStored !== null) {
    completedList = JSON.parse(completedStored);
  }
  if (deletedStored !== null) {
    deletedList = JSON.parse(deletedStored);
  }
}

// Function to render the list to the screen
function render(): void {
  if (todoList.length === 0) {
    listArea.innerHTML = "";
    return;
  }
  listArea.innerHTML = getTodoItems().join("");
}

// Load the items from local storage and render the list upon loading
getLocalStorage();
render();
