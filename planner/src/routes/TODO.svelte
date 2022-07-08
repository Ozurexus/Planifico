<script lang="ts">
	import TodoItem from '$lib/TodoItem.svelte';
	let newTodoTitle: string = '';
	let CurrentSort: string = 'all';
	let nextId: number = 1;
	type todo = {
		id: number;
		title: string;
		completed: boolean;
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
		CurrentSort === 'all'
			? ToDoList
			: CurrentSort === 'completed'
			? ToDoList.filter((todo) => todo.completed)
			: ToDoList.filter((todo) => !todo.completed);
	//TODO
	function checkAllToDoList(event: any) {
		ToDoList.forEach((todo) => (todo.completed = event.target.checked));
		ToDoList = ToDoList;
	}

	function handleDeleteTodo(event: CustomEvent) {
		ToDoList = ToDoList.filter((todo) => todo.id !== event.detail.id);
	}
	function updateFilter(newFilter: string) {
		CurrentSort = newFilter;
	}
	function clearCompleted() {
		ToDoList = ToDoList.filter((todo) => !todo.completed);
	}
	function handleToggleComplete(event: CustomEvent) {
		const todoIndex = ToDoList.findIndex((todo) => todo.id === event.detail.id);
		const updatedTodo = { ...ToDoList[todoIndex], completed: !ToDoList[todoIndex].completed };
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
		margin-left: 1px;
		min-width: 78vw;
		color: #787777a8;
		padding: 1px 20px;
		font: 'Lato';
		font-weight: 600;
		letter-spacing: 0;
		min-height: 36px;
		font-size: 30px;
		margin-bottom: 60px;
		margin-top: 60px;
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
		font-weight: 600;
		font-style: normal;
		letter-spacing: 0;
	}
	.remaining {
		font-family: 'Lato';
		color: rgba(255, 255, 255, 1);
		font-size: 30px;
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
