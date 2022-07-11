<script lang="ts">
	import Popup from '$lib/Popup.svelte';
	import EventDay from '$lib/eventDay.svelte';
	import type { CalendarEvent } from '../internal/event';
	import { getCurrentCalendar, newEventCalendar } from '../internal/out';
	import { onMount } from 'svelte';

	import type { eventDays } from '../internal/calendar';
	import { isAuth } from '../internal/middleware';
	import { routes } from '../internal/config';

	$: shown = false;
	let today: Date = new Date();
	let firstDay: Date = new Date(today.setDate(today.getDate() - today.getDay()));
	firstDay.setHours(0);
	let lastDay: Date = new Date(today.setDate(today.getDate() - today.getDay() + 6));
	$: firstDayStr = dateToString(firstDay);
	$: lastDayStr = dateToString(lastDay);
	let weekCofficient: number = 0;
	// это проверка, что юзер зашел!!!
	onMount(() => {
		if (!isAuth()) {
			location.replace(routes.basePage);
		}
	});
	$: eventDays = [];
	onMount(async () => {
		let item1 = localStorage.getItem('currentAccount');
		const curAccount = JSON.parse(item1!);
		await getCurrentCalendar(curAccount).then((value) => {
			eventDays = value;
		});
	});

	async function addNewEvent(event: CustomEvent) {
		shown = false;
		let date: Date = new Date(event.detail.date);
		let calendarEvent: CalendarEvent = event.detail.calendarEvent;

		let item1 = localStorage.getItem('currentAccount');
		const curAccount = JSON.parse(item1!);
		console.log(event.detail.calendarEvent);

		await newEventCalendar(curAccount, date, calendarEvent);
		await getCurrentCalendar(curAccount).then((value) => {
			eventDays = [...value];
			eventDays = eventDays;
		});

		console.log(eventDays);
		console.log('new event added');
	}
	function dateToString(date: Date): string {
		let dateStr: string = date.toDateString();
		let listDate: string[] = dateStr.split(' ');
		listDate[2] = listDate[2][0] !== '0' ? listDate[2] : listDate[2].slice(1);
		dateStr = listDate[1] + ' ' + listDate[2] + ', ' + listDate[3];
		return dateStr;
	}
</script>

<main>
	<p class="current-week">{firstDayStr} - {lastDayStr}</p>
	<div class="center">
		<button class="event-button" on:click={() => (shown = true)}
			><div class="button-content">
				New event<img class="plus-image" src="plus.png" alt="plus" />
			</div></button
		>
	</div>
	<div class="center">
		{#if shown}
			<Popup on:send={addNewEvent} on:close={() => (shown = false)} />
		{/if}
	</div>
	<EventDay
		{firstDay}
		{lastDay}
		{eventDays}
		on:changeWeek={(event) => {
			firstDay = event.detail.firstDay;
			lastDay = event.detail.lastDay;
		}}
	/>
</main>

<style>
	@import url('https://fonts.googleapis.com/css?family=Oswald:500,600|Lato:700,400,500,600,800');

	.current-week {
		margin-top: 2%;
		margin-bottom: 1%;
		font-size: 35px;
		color: white;
		font-family: Lato;
		font-weight: 600;
		display: flex;
		justify-content: center;
	}
	.center {
		display: flex;
		justify-content: center;
	}
	.event-button {
		box-shadow: 0 4px 4px #00000040;
		background-color: #6d6af7;
		margin-bottom: 10%;
		color: white;
		font-weight: 600;
		border: hidden;
		padding: 5px;
		font-size: 25px;
		border-radius: 6px;
		padding-left: 13px;
		padding-right: 10px;
		margin-top: 7px;
		margin-bottom: 10px;
	}
	.event-button:hover {
		background-color: #605edc;
	}
	.plus-image {
		height: 25px;
		width: 25px;
		margin-left: 5px;
	}
	.button-content {
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: Lato;
		font-weight: 600;
	}
</style>
