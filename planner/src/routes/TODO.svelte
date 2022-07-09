<script lang="ts">
	// это проверка, что юзер зашел!!!
    import { onMount } from "svelte";
	import {isAuth} from "../lib/middleware"
    onMount(() => {
		if (!isAuth()){
			location.replace("http://localhost:3000")
		}
    })
	
	import TodoItem from '../components/TodoItem.svelte';
	let newTodoTitle: string = '';
	let currentFilter: string = 'all';
	let nextId: number = 1;
	type todo = {
		id: number;
		title: string;
		completed: boolean;
	};
	type target = {
		checked: boolean;
	};
	type EventType = {
		target: target;
	};
	let ToDoList: todo[] = [];
	function addTodo(event: KeyboardEvent) {
		if (newTodoTitle === ' ') {
			newTodoTitle = '';
		}
		if (event.key === 'Enter' && newTodoTitle != '' && newTodoTitle.length > 1) {
			ToDoList = [
				...ToDoList,
				{
					id: nextId,
					completed: false,
					title: newTodoTitle
				}
			];
			nextId = nextId + 1;
			newTodoTitle = '';
		}
	}
	$: ToDoListRemaining = filteredToDoList.filter((todo) => !todo.completed).length;
	$: filteredToDoList =
		currentFilter === 'all'
			? ToDoList
			: currentFilter === 'completed'
			? ToDoList.filter((todo) => todo.completed)
			: ToDoList.filter((todo) => !todo.completed);
	//TODO
	function checkAllToDoList(event) {
		ToDoList.forEach((todo) => (todo.completed = event.target.checked));
		ToDoList = ToDoList;
	}
	function updateFilter(newFilter: string) {
		currentFilter = newFilter;
	}
	function clearCompleted() {
		ToDoList = ToDoList.filter((todo) => !todo.completed);
	}
	function handleDeleteTodo(event: CustomEvent) {
		ToDoList = ToDoList.filter((todo) => todo.id !== event.detail.id);
	}
	function handleToggleComplete(event: CustomEvent) {
		const todoIndex = ToDoList.findIndex((todo) => todo.id === event.detail.id);
		const updatedTodo = { ...ToDoList[todoIndex], completed: !ToDoList[todoIndex].completed };
		ToDoList = [...ToDoList.slice(0, todoIndex), updatedTodo, ...ToDoList.slice(todoIndex + 1)];
	}
</script>

<div class="container">
	<h1>Planifico</h1>
	<input
		type="text"
		class="todo-input"
		placeholder="Type the task"
		bind:value={newTodoTitle}
		on:keydown={addTodo}
	/>

	{#each filteredToDoList as todo}
		<div class="ToDoItem">
			<TodoItem
				{...todo}
				on:deleteTodo={handleDeleteTodo}
				on:toggleComplete={handleToggleComplete}
			/>
		</div>
	{/each}

	<div class="inner-container">
		<div>
			<label
				><input class="inner-container-input" type="checkbox" on:change={checkAllToDoList} />Check
				All</label
			>
		</div>
		<div>{ToDoListRemaining} items left</div>
	</div>

	<div class="inner-container">
		<div>
			<button on:click={() => updateFilter('all')} class:active={currentFilter === 'all'}
				>All</button
			>
			<button on:click={() => updateFilter('active')} class:active={currentFilter === 'active'}
				>Active</button
			>
			<button
				on:click={() => updateFilter('completed')}
				class:active={currentFilter === 'completed'}>Completed</button
			>
		</div>
		<dir>
			<button on:click={clearCompleted}>Clear Completed</button>
		</dir>
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 10px auto;
	}
	.todo-input {
		width: 100%;
		padding: 10px, 20px;
		font-size: 18px;
		margin-bottom: 20px;
	}
	.inner-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 16px;
		border-top: 1px solid lightgrey;
		padding-top: 15px;
		margin-bottom: 13px;
	}
	.inner-container-input {
		margin-right: 12px;
	}
	button {
		font-size: 14px;
		background-color: white;
		appearance: none;
	}
	button:hover {
		background: aqua;
	}
	button:focus {
		outline: none;
	}
	.active {
		background: aqua;
	}
</style>
