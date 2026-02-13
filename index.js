let listArea = document.getElementById("list-area");
let addBtn = document.getElementById("add-btn");
let todoInput = document.getElementById("todo-input");

// Array of item objects that will be added to and rendered
let todoList = [];

// Event listener to get the id of the clicked item
document.addEventListener("click", function (event) {
  if (event.target.closest("button") === null) return;
  deleteTodoItem(event.target.closest("button").getAttribute("data-id"));
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
  // Filter the list to remove the item with the matching id
  todoList = todoList.filter(function (item) {
    return item.id !== id;
  });
  // Saves the list to local storage
  localStorage.setItem("todoList", JSON.stringify(todoList));
  render();
}

// Function to add item to the list and then call the render function
function addTodoItem() {
  // Stop if the input is empty
  if (todoInput.value.trim() === "") {
    todoInput.focus();
    todoInput.value = "";
    return;
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
        <button data-id="${item.id}" id="btn" aria-label="delete todo item"><span aria-hidden="true">x</span></button>
    </li>`;
  });
}

// Function to get the items from local storage
function getLocalStorage() {
  const stored = localStorage.getItem("todoList");
  // Return if there is no local storage
  if (stored === null) return;
  todoList = JSON.parse(stored);
}

// Function to render the list to the screen
function render() {
  if (todoList.length === 0) listArea.innerHTML = "";
  listArea.innerHTML = getTodoItems().join("");
}

// Load the items from local storage and render the list upon loading
getLocalStorage();
render();
