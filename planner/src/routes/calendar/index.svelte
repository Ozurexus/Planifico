<script lang="ts">
	import Popup from '$lib/Popup.svelte';
	import EventDay from '$lib/eventDay.svelte';
	import { CalendarEvent } from '$lib/event';
	
	$: shown = false;
	let today: Date = new Date();
	let firstDay: Date = new Date(today.setDate(today.getDate() - today.getDay()));
	let lastDay: Date = new Date(today.setDate(today.getDate() - today.getDay() + 6));
	let firstDayStr: string = dateToString(firstDay);
	let lastDayStr: string = dateToString(lastDay);
	$: eventDays = [
		{
			date: new Date('2022-7-1'),
			events: [
				new CalendarEvent('Cinema', '10:00 AM','11:30 AM', [
					'chill',
					'beer',
					'chips',
					'Pypcorn',
					'subtitles'
				])
			]
		},
		{
			date: new Date('3 Jul 2022'),
			events: [
				new CalendarEvent('Meeting', '10:00 AM','11:30 AM', ['work']),
				new CalendarEvent('Weekly Meeting', '2:00 PM','3:00 PM', ['work']),
				new CalendarEvent('Month Meeting', '16:00 PM','19:00 PM', ['work', 'important'])
			]
		},
		{
			date: new Date('2022-10-16'),
			events: [
				new CalendarEvent('Cinema', '10:00 AM','11:30 AM', [
					'chill',
					'beer',
					'chips',
					'popcorn',
					'subtitles'
				])
			]
		},
		{
			date: firstDay,
			events: [
				new CalendarEvent('Cinema', '10:00 AM','11:30 AM', [
					'chill',
					'beer',
					'chips',
					'popcorn',
					'subtitles'
				])
			]
		}
	];

	function addNewEvent(event: CustomEvent) {
		shown = false;
		let date:Date = new Date(event.detail.date);
		let calendarEvent: CalendarEvent = event.detail.calendarEvent;
		let was:boolean = false;
		eventDays.forEach((obj) => {
			console.log(obj.date.getTime(), date.getTime())
			if(obj.date.getTime() === date.getTime()){
				obj.events = [...obj.events, calendarEvent];
				was = true;
			}
		})
		if(!was)
			eventDays = [...eventDays, {date:date, events:[calendarEvent]}];

		eventDays=eventDays;
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
	<div class="container">
		<EventDay {eventDays} {firstDay} {lastDay}/>
	</div>
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
	.event-button:hover{
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
