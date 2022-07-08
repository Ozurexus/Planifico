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

<div class="todo-item" on:click={toggleComplete}>
	<div class="todo-item-left" transition:scale={{ delay: 0, duration: 200 }}>
		<input class="check" type="checkbox" bind:checked={completed} />
		<div class="todo-item-label" style="lato-semi-bold-white-30px" class:completed>{title}</div>
	</div>
	<div class="remove-item" on:click={deleteTodo}>
		<img
			class="cross"
			src="https://cdn.animaapp.com/projects/62c6ee8763ed96b1e323f065/releases/62c6ee9b4787cdaec3d8b4aa/img/close-1@2x.png"
			alt=""
		/>
	</div>
</div>

<style>
	@import url(https://fonts.googleapis.com/css?family=Oswald:500,600|Lato:700,500,600,800);
	.todo-item {
		margin-bottom: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		animation-duration: 0.25s;
		min-height: 36px;
	}
	.remove-item {
		cursor: pointer;
		max-width: 0vw;
	}
	.cross {
		height: 28px;
		width: 28px;
	}
	.check {
		background-color: (255, 255, 255, 1);
		border-radius: 2px;
		box-shadow: 0px 4px 4px #00000040;
		height: 22px;
		width: 22px;
	}
	.remove-item:hover {
		color: blue;
	}
	.todo-item-left {
		display: flex;
		align-items: center;
	}
	.todo-item-label {
		margin-left: 12px;
		min-height: 36px;
		letter-spacing: 0;
		font-weight: 500;
		font-style: normal;
		color: rgba(255, 255, 255, 1);
		font-family: 'Lato';
		font-size: 20px;
	}
	.completed {
		text-decoration: line-through;
		color: grey;
	}
</style>
