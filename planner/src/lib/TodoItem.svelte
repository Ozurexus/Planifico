<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';
	export let id: number;
	export let title: string;
	export let completed: boolean;
	const dispatch = createEventDispatcher();
	function toggleComplete() {
		dispatch('toggleComplete', {
			id: id
		});
	}
	function deleteTodo() {
		dispatch('deleteTodo', {
			id: id
		});
	}
</script>

<div class="todo-item">
	<div class="todo-item-left" transition:scale={{ delay: 0, duration: 200 }}>
		<input type="checkbox" bind:checked={completed} on:change={toggleComplete} />
		<div class="todo-item-label" class:completed>{title}</div>
	</div>
	<div class="remove-item" on:click={deleteTodo}>x</div>
</div>

<style>
	.todo-item {
		margin-bottom: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		animation-duration: 0.25s;
	}
	.remove-item {
		cursor: pointer;
		margin-left: 15px;
	}
	.remove-item:hover {
		color: blue;
	}
	.todo-item-left {
		display: flex;
		align-items: center;
	}
	.todo-item-label {
		border: 1px solid white;
		margin-left: 12px;
	}
	.completed {
		text-decoration: line-through;
		color: grey;
	}
</style>
