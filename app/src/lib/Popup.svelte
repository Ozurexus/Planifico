<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Taglist from '$lib/Taglist.svelte';
	import DatePicker from '$lib/DatePicker.svelte';
	import { CalendarEvent } from '../internal/event';

	let date: Date;
	const calendarEvent: CalendarEvent = new CalendarEvent('', '', '', [], '');

	function addDateAndTime(event: any) {
	  date = new Date(event.detail.date);
	  calendarEvent.timeStart = event.detail.timeStart;
	  calendarEvent.timeEnd = event.detail.timeEnd;
	  console.log(calendarEvent, date);
	  console.log('date and time added');
	}
	function changeTags(event: any) {
	  calendarEvent.tags = event.detail.tags;
	  console.log('tags changed');
	}

	const dispatch = createEventDispatcher();

	function send() {
	  dispatch('send', { date, calendarEvent });
	  console.log('send');
	}
	function close() {
	  dispatch('close', {});
	  console.log('close');
	}
</script>

<main>
	<div class="popupbg">
		<div class="topbar">
			<h2>Add new event</h2>
			<input
				on:click={close}
				class="button"
				id="close"
				type="image"
				name="close_button"
				src="close.png"
				alt="close button"
			/>
		</div>
		<input
			id="input-name"
			type="text"
			placeholder="Type event name"
			bind:value={calendarEvent.title}
		/>
		<DatePicker on:sendDate={addDateAndTime} />
		<p>Select a tag</p>
		<Taglist on:change={changeTags} />
		<button
			class="button"
			id="send"
			disabled={!date || !calendarEvent.timeStart || !calendarEvent.timeEnd || !calendarEvent.title}
			on:click={send}>Add</button
		>
	</div>
</main>

<style>
	main {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
	}
	.popupbg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
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
	.button {
		cursor: pointer;
		border-style: none;
	}
	#send:hover:enabled {
		background-color: #605edc;
	}
	#close:hover {
		background-color: rgb(230, 230, 230);
	}
	#close {
		width: 28px;
		position: absolute;
		top: 15px;
		right: 15px;
	}
	#input-name {
		text-align: center;
		font-size: 20px;
		width: 80%;
		height: 39px;
		border-style: none;
		background-color: rgba(246, 246, 246, 1);
		border-radius: 6px;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}
	#send {
		width: 20%;
		height: 30px;
		margin: 10px;
		background: #6d6af7;
		border-radius: 6px;
		color: white;
		font-size: 20px;
	}
	#send:disabled {
		cursor: auto;
		background-color: rgb(215, 215, 215);
	}
</style>
