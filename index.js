let listArea = document.getElementById("list-area");
let addBtn = document.getElementById("add-btn");
let todoInput = document.getElementById("todo-input");

// Array of item objects that will be added to and rendered
let todoList = [];
let completedList = [];
let deletedList = [];

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
function deleteTodoItem(id) {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      deletedList.push(todoList[i]);
    }
  }
  // Filter the list to remove the item with the matching id
  todoList = todoList.filter(function (item) {
    return item.id !== id;
  });
  // Saves the list to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem("deletedList", JSON.stringify(deletedList));
  render();
}

function completeTodoItem(id) {
  // Add the item with the matching id to the completed list
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      completedList.push(todoList[i]);
    }
  }
  // Remove the item from the todoList
  todoList = todoList.filter(function (item) {
    return item.id !== id;
  });
  // Saves the updated list to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem("completedList", JSON.stringify(completedList));
  render();
}

// Function to add item to the list and then call the render function
function addTodoItem() {
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
function getTodoItems() {
  // Stop if the list is empty
  if (todoList.length === 0) return;
  return todoList.map(function (item) {
    return `
    <li>
        ${item.text}
        <div class="btn-container">
            <button data-id="${item.id}" class="btn btn-complete" id="btn" aria-label="mark todo item as complete">
                <img class="icon" src="./images/trash-solid-full.svg" alt="Trash can icon" />
            </button>
            <button data-id="${item.id}" class="btn btn-delete" id="btn" aria-label="delete todo item">
                <img class="icon" src="./images/check-solid.svg" alt="Check mark icon">
            </button>
        </div>
    </li>`;
  });
}

// Function to get the items from local storage
function getLocalStorage() {
  const stored = localStorage.getItem("todoList");
  const completedStored = localStorage.getItem("completedList");
  const deletedStored = localStorage.getItem("deletedList");
  // Return if there is no local storage
  if (stored !== null) {
    todoList = JSON.parse(stored);
  }
  if (completedStored !== null) {
    completedList = JSON.parse(completedStored);
  }
  if (deletedStored !== null) {
    deletedList = JSON.parse(deletedStored);
  }
}

// Function to render the list to the screen
function render() {
  if (todoList.length === 0) {
    listArea.innerHTML = "";
    return;
  }
  listArea.innerHTML = getTodoItems().join("");
}

// Load the items from local storage and render the list upon loading
getLocalStorage();
render();
