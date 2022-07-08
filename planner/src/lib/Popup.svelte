<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    import Taglist from '$lib/Taglist.svelte'
	let eventName: string = 'bruh you didnt enter anything';
	const dispatch = createEventDispatcher();
	function send() {
		console.log('send');
		dispatch('send', { eventName });
	}
	function close() {
		console.log('close');
		dispatch('close', {});
	}
</script>

<main>
	<div class="topbar">
		<h2>Add new event</h2>
		<input
			on:click={close}
			class="close"
			type="image"
			name="close_button"
			src="close.png"
			alt="close button"
		/>
	</div>
	<input id="input-name" type="text" bind:value={eventName} />
	<p>Choose a date</p>
	<p>Select a tag</p>
    <Taglist/>
	<button class="send" on:click={send}>Add</button>
</main>

<style>
	main {
		background-color: white;
		border-radius: 32px;
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		justify-items: center;
		align-items: center;
		margin: 5px;
		color: rgba(109, 106, 247, 1);
	}
	.topbar {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	h2 {
		color: rgb(109, 106, 247);
	}
	.close {
		width: 28px;
		position: absolute;
		top: 15px;
		right: 15px;
	}
	#input-name {
		color: rgba(203, 203, 203, 1);
		text-align: center;
		font-size: 20px;
		width: 80%;
		height: 39px;
		border-style: none;
		background-color: rgba(246, 246, 246, 1);
		border-radius: 6px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}
	.send {
		border-style: none;
		width: 20%;
		height: 30px;
		margin: 10px;
		background: #6d6af7;
		border-radius: 6px;
		color: white;
		font-size: 20px;
	}
</style>
