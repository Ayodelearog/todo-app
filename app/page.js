"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./page.module.css";
import "./globals.css";
import ViewTask from "./comps/ViewTask";
import TodoItem from "./TodoItem";
import AddCard from "./AddCard";

export default function Home() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [ViewTodoCard, setViewTodoCard] = useState(false);
	const [currentValue, setCurrentValue] = useState("");
	const [selectedTodo, setSelectedTodo] = useState(undefined);
	const [editIsClicked, setEditIsClicked] = useState(false);

	// Load todos from local storage when the component mounts
	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
		setTodos(storedTodos);
	}, []);

	const addTodo = () => {

		if (newTodo.trim() !== "") {
			// Create a new todo object
			const newTodoItem = { value: newTodo, id: uuidv4(), status: false };
	
			// Update the state
			setTodos((prevTodos) => [newTodoItem, ...prevTodos]);

			setNewTodo("");
		}
	};

	// Save todos to local storage whenever the todos state changes
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const handleChecked = (id) => {
		// update the status of the selected item
		const updatedList = todos.map((todo) => {
			if (todo.id === id) {
				console.log(todo)
				todo.status = !todo.status;
			}
			return todo;
		});
		setTodos(updatedList);
	};

	const handleView = ({ id, index, todos }) => {
		// Find the todo with the specified ID
		const selectedTodo = todos.find((todo) => todo.id === id);

		
		if (selectedTodo) {
			// Toggle the visibility of the todo card
			setViewTodoCard(!ViewTodoCard);

			// Set the current value to the value of the selected todo
			setCurrentValue(selectedTodo.value);

			// Store the selected todo in the state
			// This can be used in other functions such as handleEdit or handleDelete
			setSelectedTodo(selectedTodo);
		}
	};

	
	const handleDelete = (selectedTodo) => {
		

		// Retrieve the entire list from local storage
		const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

		// Remove the item from the list
		const updatedTodos = storedTodos.filter((todo) => todo.id !== selectedTodo.id);
	
		// Store the updated list back to local storage
		localStorage.setItem("todos", JSON.stringify(updatedTodos));
	
		// Update the state
		setTodos(updatedTodos);

		setCurrentValue("");
		setViewTodoCard(!ViewTodoCard);
	};

	const handleCancel = () => {
		setNewTodo("");
	};

	const handleEdit = () => {
		setEditIsClicked(!false);
		setViewTodoCard(!ViewTodoCard);
	};

	const handleSave = (selectedTodo) => {
		if (selectedTodo !== undefined) {

			// Retrieve the entire list from local storage
			const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
		}

		// Find the todo item to edit
		const editTodo = storedTodos.find((todo) => todo.id === selectedTodo.id);
		

		// If the todo item was found, update its value
		if (editTodo) {
			editTodo.value = newTodo;
			setCurrentValue(newTodo)
			console.log(editTodo)

			// Save the updated list back to local storage
			localStorage.setItem("todos", JSON.stringify(storedTodos));

			// Update the state
			setTodos(storedTodos);
			setNewTodo("");
			setEditIsClicked(!editIsClicked)
		}
	};

	return (
		<main className={styles.main}>
			<div className="main-container">
				<div className="left-cont">
					<h2>My Tasks</h2>

					<div className="todo-cont">
						{todos &&
							todos.map(({ id, value, status }, index) => {
								return (
									<TodoItem
										key={id}
										id={id}
										value={value}
										status={status}
										index={index}
										handleChecked={handleChecked}
										handleView={handleView}
										todos={todos}
									/>
								);
							})}
					</div>
				</div>

				<div className="right-cont">
					{!ViewTodoCard && (
						<AddCard
							// key={id}
							newTodo={newTodo}
							setNewTodo={setNewTodo}
							handleCancel={handleCancel}
							handleSave={handleSave}
							addTodo={addTodo}
							editIsClicked={editIsClicked}
							selectedTodo={selectedTodo}
						/>
					)}
					{ViewTodoCard && (
						<ViewTask
							// key={2}

							todos={todos}
							setTodos={setTodos}
							currentValue={currentValue}
							handleDelete={handleDelete}
							selectedTodo={selectedTodo}
							handleEdit={handleEdit}
						/>
					)}
				</div>
			</div>
		</main>
	);
}
