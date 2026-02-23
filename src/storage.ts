// This file manages the local storage and the arrays for completed, deleted, and current todoList items
import { Todo } from "./types";

// Array of item objects that will be added to and rendered
export let todoList: Todo[] = [];
export let completedList: Todo[] = [];
export let deletedList: Todo[] = [];

// Functions to alter lists
export function setTodoList(newList: Todo[]): void {
  todoList = newList;
}
export function addToCompletedList(item: Todo): void {
  completedList.push(item);
}
export function addToTodoList(item: Todo): void {
  todoList.push(item);
}
export function addToDeletedList(item: Todo): void {
  deletedList.push(item);
}

// Functions to save the items to local storage
export function setLocalStorage(): void {
  localStorage.setItem("todoList", JSON.stringify(todoList));
  localStorage.setItem("completedList", JSON.stringify(completedList));
  localStorage.setItem("deletedList", JSON.stringify(deletedList));
}

// Function to get the items from local storage
export function getLocalStorage(): void {
  const todoStored: string | null = localStorage.getItem("todoList");
  const completedStored: string | null = localStorage.getItem("completedList");
  const deletedStored: string | null = localStorage.getItem("deletedList");
  // load the items from local storage if they exist
  todoList = JSON.parse(todoStored ?? "[]");
  completedList = JSON.parse(completedStored ?? "[]");
  deletedList = JSON.parse(deletedStored ?? "[]");
}
