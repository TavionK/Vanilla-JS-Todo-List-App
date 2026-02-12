let listArea = document.getElementById("list-area");
let addBtn = document.getElementById("add-btn");

// List of todos that will be added to and rendered
let todoList = ["Buy milk", "Feed the cat", "Clean the house"];

// Event listener for the add button
addBtn.addEventListener("click", addTodoItem);

// Function to add item to the list and then call the render function
function addTodoItem() {
  todoList.push(document.getElementById("todo-input").value);
  // Clears the input field
  document.getElementById("todo-input").value = "";
  render();
}

// Function to get the array of HTML strings for each list item
// This array is supplied to the render method to render the list
function getTodoItems() {
  return todoList.map(function (item) {
    return `<li>${item}</li>`;
  });
}

// Function to render the list to the screen
function render() {
  listArea.innerHTML = getTodoItems().join("");
}

render();
