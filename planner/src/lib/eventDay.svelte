<script lang="ts">
	import type { CalendarEvent } from '../internal/event';
	import { eventDelete } from '../internal/out';
	import { createEventDispatcher } from 'svelte';
	
	let weekCofficient;

	const today: Date = new Date();
	today.setHours(0);
	export let firstDay: Date; // first day of the week that showed
	export let lastDay: Date; // last day of the week that showed
	$: weekCofficient = 0;

	export let eventDays: {
		date: Date;
		events: CalendarEvent[];
	}[];
	$: console.log(firstDay.toDateString(), lastDay.toDateString());
	async function deleteEvent(id: string) {
	  console.log(id);
	  let item1 = localStorage.getItem('currentAccount');
	  const curAccount = JSON.parse(item1!);
	  await eventDelete(curAccount, id).then(() => {
	    eventDays.forEach((elem) => {
	      elem.events = elem.events.filter((element) => element.id !== id);
	    });
	    eventDays = eventDays.filter((elem) => elem.events.length != 0);
	    eventDays = eventDays;
	  });
	}
	function getDateDay(date: Date): string {
	  let dateStr: string[] = date.toDateString().split(' ');
	  return dateStr[2][0] != '0' ? dateStr[2] : dateStr[2].slice(1);
	}
	function getDateDayOfWeek(date: Date): string {
	  let dateStr: string[] = date.toDateString().split(' ');
	  return dateStr[0];
	}
	function getDateMonth(date: Date): string {
	  let dateStr: string[] = date.toDateString().split(' ');
	  return dateStr[1];
	}
	function getDateYear(date: Date): string {
	  let dateStr: string[] = date.toDateString().split(' ');
	  return dateStr[3];
	}

	const dispatch = createEventDispatcher();
	function changeWeek() {
	  dispatch('changeWeek', { firstDay, lastDay });
	}
</script>

<main>
	<div class="container">
		<div
			class="arrow"
			on:click={() => {
				weekCofficient--;
				weekCofficient = weekCofficient;
				firstDay.setDate(firstDay.getDate() - 7);
				lastDay.setDate(lastDay.getDate() - 7);
				firstDay = firstDay;
				lastDay = lastDay;
				changeWeek();
			}}
		>
			<img class="arrow-image" src="arrow-left.png" alt="" />
		</div>
		<div class="grid-table">
			<div class="table">
				<div class="tableHeader">
					<div>Date</div>
					<div>Time</div>
					<div>Event</div>
				</div>
				{#each eventDays as eventDay}
					{#if firstDay.getTime() <= eventDay.date.getTime() && eventDay.date.getTime() <= lastDay.getTime()}
						<div
							class={eventDay.date.getTime() < today.getTime()
								? 'background-passed-day'
								: 'background-day'}
						>
							<div class="eventsDate" style="grid-row: 1/{eventDay.events.length + 1}">
								<!-- Start work with date-->
								<div class="date">
									<div class="day">
										{getDateDay(eventDay.date)}
									</div>
									<div class="dayOfWeekAndYearAndMonth">
										<div class="dayOfWeek">
											{getDateDayOfWeek(eventDay.date)}
										</div>
										<div class="monthAndYear">
											{getDateMonth(eventDay.date)}, {getDateYear(eventDay.date)}
										</div>
									</div>
								</div>
								<!-- End work with date-->
							</div>
							{#each eventDay.events as event, id}
								<div class={id != 0 ? 'eventTime' : 'firstEventTime'}>
									<div class="eventTimeContent">{event.timeStart} - {event.timeEnd}</div>
								</div>
								<div class={id != 0 ? 'eventTitleAndTags' : 'firstEventTitleAndTags'}>
									<div class="eventTitle">{event.title}</div>
									<div class="eventTags">
										{#each event.tags as eventTag}
											<div class="eventTag">
												{eventTag}
											</div>
										{/each}
									</div>
									<div
										class="close"
										on:click={() => {
											deleteEvent(event.id);
										}}
									>
										<img
											class="cross"
											src="https://cdn-icons-png.flaticon.com/128/966/966615.png"
											alt=""
										/>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				{/each}
			</div>
		</div>
		<div
			class="arrow"
			on:click={() => {
				weekCofficient++;
				weekCofficient = weekCofficient;
				firstDay.setDate(firstDay.getDate() + 7);
				lastDay.setDate(lastDay.getDate() + 7);
				firstDay = firstDay;
				lastDay = lastDay;
				console.log(eventDays);
				changeWeek();
			}}
		>
			<img class="arrow-image" src="arrow-right.png" alt="" />
		</div>
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css?family=Oswald:500,600|Lato:700,400,500,600,800');
	.arrow-image:hover {
		background-color: rgb(220, 220, 220);
	}
	.arrow-image {
		height: 50px;
		width: 50px;
		padding: 7px;
		border-radius: 60px;
	}
	.container {
		justify-content: center;
		display: flex;
		width: 100%;
		gap: 10px;
	}
	.grid-table {
		flex-basis: 80%;
	}
	.arrow {
		align-self: center;
	}
	.close {
		display: flex;
		align-self: center;
		cursor: pointer;
	}
	.cross:hover {
		background-color: rgb(220, 220, 220);
	}
	.cross {
		height: 22px;
		width: 22px;
		padding: 7px;
		margin-left: 10px;
		margin-right: 15px;
		border-radius: 60px;
	}
	.date {
		display: flex;
	}
	.day {
		font-size: 50px;
		align-self: center;
	}
	.dayOfWeekAndYearAndMonth {
		margin-left: 20px;
		display: flex;
		flex-direction: column;
	}
	.dayOfWeek {
		font-size: 32px;
	}
	.monthAndYear {
		font-size: 18px;
		color: silver;
	}

	.table {
		display: grid;
		overflow-y: auto;
		height: 450px;
		background-color: white;
		padding: 30px 30px;
		border-radius: 28px;
		font-family: Lato;
		font-weight: 550;
		color: rgba(96, 49, 98, 1);
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
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		background-color: #ffffff;
	}
	.tableHeader {
		background-color: white;
		display: grid;
		grid-template-columns: 20% 25% 55%;
		font-size: 35px;
		padding-bottom: 20px;
	}
	.background-passed-day {
		background-color: rgb(240, 240, 240);
		display: grid;
		grid-template-columns: 20% 25% 55%;
		font-size: 23px;

		border-top: 3px solid #dfdfdf;
	}
	.background-passed-day div {
		background-color: rgb(240, 240, 240);
	}
	.background-day {
		background-color: white;
		display: grid;
		grid-template-columns: 20% 25% 55%;
		font-size: 23px;

		border-top: 3px solid #dfdfdf;
	}
	.eventsDate {
		grid-column: 1/2;
		background-color: white;
		padding: 17px;
	}
	.eventTime {
		grid-column: 2/3;
		border-top: 1px solid #dfdfdf;
		display: flex;
		background-color: white;
		padding: 20px 0px;
		font-size: 28px;
	}
	.eventTimeContent {
		align-self: center;
	}
	.firstEventTime {
		grid-column: 2/3;
		background-color: white;
		display: flex;
		padding: 20px 0px;
		font-size: 28px;
	}
	.eventTitleAndTags {
		grid-column: 3/4;
		border-top: 1px solid #dfdfdf;
		display: flex;
		justify-content: space-between;
		background-color: white;
		padding: 20px 0px;
		font-size: 28px;
	}
	.firstEventTitleAndTags {
		grid-column: 3/4;
		display: flex;
		justify-content: space-between;
		background-color: white;
		padding: 20px 0px;
		font-size: 28px;
	}
	.eventTags {
		display: flex;
		flex-wrap: wrap;
		margin-left: 20px;
	}
	.eventTitle {
		display: flex;
		flex-wrap: wrap;
		align-self: center;
		font-size: 28px;
	}
	.eventTag {
		align-self: center;
		margin: 5px;
		border: 2px solid;
		border-radius: 25px;
		padding: 3px;
		padding-left: 9px;
		padding-right: 9px;
	}
</style>
