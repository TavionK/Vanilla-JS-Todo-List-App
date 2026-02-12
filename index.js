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
  todoList = todoList.filter(function (item) {
    return item.id !== id;
  });
  localStorage.setItem("todoList", JSON.stringify(todoList));
  render();
}

// Function to add item to the list and then call the render function
function addTodoItem() {
  if (todoInput.value.trim() === "") {
    todoInput.focus();
    todoInput.value = "";
    return;
  }
  // creates random id and adds the object to the todoList array
  todoList.push({ id: crypto.randomUUID(), text: todoInput.value });
  // Clears the input field
  todoInput.value = "";
  todoInput.focus();
  localStorage.setItem("todoList", JSON.stringify(todoList));
  render();
}

// Function to get the array of HTML strings for each list item
// This array is supplied to the render method to render the list
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
  // Return if there is no local storage
  if (localStorage.getItem("todoList") === null) return;
  todoList = JSON.parse(localStorage.getItem("todoList"));
}

// Function to render the list to the screen
function render() {
  if (todoList.length === 0) return;
  listArea.innerHTML = getTodoItems().join("");
}

// Load the items from local storage and render the list upon loading
getLocalStorage();
render();
