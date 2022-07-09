<script lang="ts">
	// это проверка, что юзер зашел!!!
    import { onMount } from "svelte";
	import {isAuth} from "../internal/middleware"
	
    onMount(() => {
        if (!isAuth()){
            location.replace("http://localhost:3000")
        }
    })

	import Popup from '../lib/Popup.svelte';
	$: shown = false;

	$: events = ['shalom', 'hava', 'nagila'];

	function showPopup() {
		shown = true;
	}
	function close() {
		shown = false;
	}
	function addNewEvent(event: any) {
		shown = false;
		events = [...events, event.detail.eventName];
		console.log(events);
		console.log('new event added');
	}
	function dateToString(date: Date): string {
		let dateStr: string = date.toDateString();
		let listDate: string[] = dateStr.split(' ');
		listDate[2] = listDate[2][0] !== '0' ? listDate[2] : listDate[2].slice(1);
		dateStr = listDate[1] + ' ' + listDate[2] + ', ' + listDate[3];
		return dateStr;
	}
	let today: Date = new Date();
	let firstDay: Date = new Date(today.setDate(today.getDate() - today.getDay()));
	let lastDay: Date = new Date(today.setDate(today.getDate() - today.getDay() + 6));
	let firstDayStr: string = dateToString(firstDay);
	let lastDayStr: string = dateToString(lastDay);
</script>


<main>
	<p class="current-week">{firstDayStr} - {lastDayStr}</p>
	<div class="center">
		<button class="event-button" on:click={showPopup}
			><div class="button-content">
				New event<img class="plus-image" src="plus.png" alt="plus" />
			</div></button
		>
	</div>
	<div class="center">
		{#if shown}
			<Popup on:send={addNewEvent} on:close={close} />
		{/if}
	</div>
	<div class="container">
		<p>Date Time Event</p>
		{#each events as event}
			<p>{event}</p>
		{/each}
	</div>
</main>

<style>
	.current-week {
		margin-top: 2%;
		font-size: 40px;
		color: white;
		display: flex;
		justify-content: center;
	}
	.center {
		display: flex;
		justify-content: center;
	}
	.event-button {
		background-color: #6d6af7;
		color: white;
		border: hidden;
		padding: 5px;
		font-size: 18px;
		border-radius: 5px;
	}
	.plus-image {
		height: 22px;
		width: 22px;
		margin-left: 5px;
	}
	.button-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
