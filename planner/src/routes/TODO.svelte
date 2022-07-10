<script lang="ts">
	import TodoItem from '$lib/TodoItem.svelte';
	import { db } from '$lib/Firebase';
	import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
	let newTodoTitle: string = '';
	let CurrentSort: string = 'all';
	type todo = {
		id: string;
		title: string;
		completed: boolean;
		BDID: string;
	};
	let ToDoList: todo[] = [];

	async function Fetcher() {
		const q = collection(db, 'ToDo');
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((DOC) => {
			const data = DOC.data();
			const todo = {
				id: data.id,
				completed: data.completed,
				title: data.title,
				BDID: DOC.id
			};
			Show(todo);
		});
	}
	async function Show(DOC: todo) {
		ToDoList = [
			...ToDoList,
			{
				id: DOC.id,
				completed: DOC.completed,
				title: DOC.title,
				BDID: DOC.BDID
			}
		];
	}
	Fetcher();
	async function addTodo(event: KeyboardEvent) {
		if (newTodoTitle === ' ') {
			newTodoTitle = '';
		}
		if (event.key === 'Enter' && newTodoTitle != '' && newTodoTitle.length > 1) {
			let date: string = String(Date.now());
			let todo = {
				id: date,
				completed: false,
				title: newTodoTitle,
				BDID: ''
			};
			await addDoc(collection(db, 'ToDo'), todo).then((docref) => {
				todo.BDID = docref.id;
				Show(todo);
			});
			newTodoTitle = '';
		}
	}
	$: ToDoListRemaining = filteredToDoList.filter((todo) => !todo.completed).length;
	$: filteredToDoList =
		CurrentSort === 'all'
			? ToDoList
			: CurrentSort === 'completed'
			? ToDoList.filter((todo) => todo.completed)
			: ToDoList.filter((todo) => !todo.completed);
	function checkAllToDoList(event: any) {
		ToDoList.forEach((todo) => setCompleteness(todo, event.srcElement.checked));
		ToDoList = ToDoList;
	}
	async function handleDeleteTodo(event: CustomEvent) {
		await deleteDoc(doc(db, 'ToDo', event.detail.BDID));
		ToDoList = ToDoList.filter((todo) => todo.id !== event.detail.id);
	}
	function updateFilter(newFilter: string) {
		CurrentSort = newFilter;
	}
	function clearCompleted() {
		const Deleter = ToDoList.filter((todo) => todo.completed);
		ToDoList = ToDoList.filter((todo) => !todo.completed);
		Deleter.forEach((todo) => deleteDoc(doc(db, 'ToDo', todo.BDID)));
	}
	async function handleToggleComplete(event: any) {
		await updateDoc(doc(db, 'ToDo', event.detail.BDID), {
			completed: !event.detail.completed
		});
		const todoIndex = ToDoList.findIndex((todo) => todo.id === event.detail.id);
		const updatedTodo = { ...ToDoList[todoIndex], completed: !ToDoList[todoIndex].completed };
		ToDoList = [...ToDoList.slice(0, todoIndex), updatedTodo, ...ToDoList.slice(todoIndex + 1)];
	}
	async function setCompleteness(tododo: todo, state: boolean) {
		await updateDoc(doc(db, 'ToDo', tododo.BDID), {
			completed: state
		});
		const todoIndex = ToDoList.findIndex((todo) => todo.id === tododo.id);
		const updatedTodo = { ...ToDoList[todoIndex], completed: state };
		ToDoList = [...ToDoList.slice(0, todoIndex), updatedTodo, ...ToDoList.slice(todoIndex + 1)];
	}
</script>

<div class="container">
	<input
		type="text"
		class="todo-input"
		placeholder="Type the task"
		bind:value={newTodoTitle}
		on:keydown={addTodo}
	/>

	<div class="items-block">
		{#each filteredToDoList as todo}
			<div class="ToDoItem">
				<TodoItem
					{...todo}
					on:deleteTodo={handleDeleteTodo}
					on:toggleComplete={handleToggleComplete}
				/>
			</div>
		{/each}
	</div>

	<div class="inner-container">
		<div>
			<label class="Label"
				><input class="inner-container-input" type="checkbox" on:change={checkAllToDoList} />Check
				All</label
			>
		</div>
		<div class="remaining">{ToDoListRemaining} items left</div>
	</div>

	<div class="inner-container">
		<div>
			<button on:click={() => updateFilter('all')} class:active={CurrentSort === 'all'}>All</button>
			<button on:click={() => updateFilter('active')} class:active={CurrentSort === 'active'}
				>Active</button
			>
			<button on:click={() => updateFilter('completed')} class:active={CurrentSort === 'completed'}
				>Completed</button
			>
		</div>
		<button class="Clear" on:click={clearCompleted}>Clear Completed</button>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css?family=Oswald:500,600|Lato:700,400,500,600,800');

	.container {
		max-width: 80vw;
		margin: 10px auto;
	}
	.todo-input {
		align-items: flex-start;
		align-self: flex-start;
		border: 2px solid rgba(109, 106, 247, 1);
		border-radius: 10px;
		display: flex;
		outline: none;
		margin-left: 1px;
		min-width: 78vw;
		color: rgba(96, 49, 98, 1);
		padding: 1px 20px;
		font: 'Lato';
		font-weight: 600;
		letter-spacing: 0;
		min-height: 36px;
		font-size: 27px;
		margin-bottom: 60px;
		margin-top: 60px;
	}

	::placeholder {
		color: rgb(145, 143, 143);
		font-family: Lato;
		font-weight: 600;
	}

	.items-block {
		width: 103%;
		height: 300px;

		overflow: auto; /* свойство для прокрутки по горизонтали. Автоматом, если больше блока */
		overflow-x: hidden;
	}

	::-webkit-scrollbar {
		width: 10px;
		background-color: none;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: rgba(109, 106, 247, 1);
	}

	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		background-color: #ffffff;
	}

	.ToDoItem {
		word-break: break-all;
	}

	.inner-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 16px;
		padding-top: 15px;
		margin-bottom: 13px;
	}
	.inner-container-input {
		margin-top: 10px;
		margin-right: 12px;
		letter-spacing: 0;
		background-color: (255, 255, 255, 1);
		border-radius: 2px;
		box-shadow: 0px 4px 4px #00000040;
		height: 22px;
		width: 22px;
	}
	.Label {
		font-family: 'Lato';
		color: rgba(255, 255, 255, 1);
		font-size: 30px;
		font-weight: 800;
		font-style: normal;
		letter-spacing: 0;
		font-size: 27px;
	}
	.remaining {
		font-family: 'Lato';
		color: rgba(255, 255, 255, 1);
		font-size: 27px;
		font-weight: 600;
		font-style: normal;
		letter-spacing: 0;
	}
	.Clear {
		margin-right: 0px;
	}
	button {
		color: rgba(109, 106, 247, 1);
		font-family: 'Lato';
		font-weight: 600;
		letter-spacing: 0;
		font-size: 24px;
		font-style: normal;
		box-shadow: 0px 4px 4px #00000040;
		margin-right: 15px;
		border-radius: 10px;
		padding: 2px 30px;
		border-width: 0px;
	}
	button:hover {
		background-color: #4fd7b5;
		color: rgba(255, 255, 255, 1);
	}
	button:focus {
		outline: none;
	}
	.active {
		background: #4fd7b5;
		color: rgba(255, 255, 255, 1);
	}
</style>
