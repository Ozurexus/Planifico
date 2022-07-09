<script lang="ts">
	import type { CalendarEvent } from '$lib/event';
	import TableDateElement from '$lib/TableDateElement.svelte';

	export let eventDays: {
		date: Date;
		events: CalendarEvent[];
	}[];
</script>

<main>
	<div class="table">
		<div class="tableHeader">
			<div>Date</div>
			<div>Time</div>
			<div>Event</div>
		</div>
		{#each eventDays as eventDay, id}
			<div class="background-day">
				<div class="eventsDate" style="grid-row: 1/{eventDay.events.length + 1}">
					<TableDateElement date={eventDay.date} />
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
					</div>
				{/each}
			</div>
		{/each}
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css?family=Oswald:500,600|Lato:700,400,500,600,800');

	.table {
		display: grid;
		/* gap: 10px; */
		background-color: white;
		padding: 30px 30px;
		border-radius: 28px;
		width: 80%;
		margin-left: 10%;
		font-family: Lato;
		font-weight: 550;
		color: rgba(96, 49, 98, 1);
	}
	.tableHeader {
		background-color: white;
		display: grid;
		grid-template-columns: 15% 20% 65%;
		font-size: 40px;
		padding-bottom: 20px;
	}
	.background-day {
		background-color: white;
		display: grid;
		grid-template-columns: 15% 20% 65%;
		font-size: 23px;

		border-top: 3px solid #dfdfdf;
	}
	.eventsDate {
		background-color: white;
		padding: 17px;
	}
	.eventTime {
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
		background-color: white;
		display: flex;
		padding: 20px 0px;
		font-size: 28px;
	}
	.eventTitleAndTags {
		border-top: 1px solid #dfdfdf;
		display: flex;
		justify-content: space-between;
		background-color: white;
		padding: 20px 0px;
		font-size: 28px;
	}
	.firstEventTitleAndTags {
		display: flex;
		justify-content: space-between;
		background-color: white;
		padding: 20px 0px;
		font-size: 28px;
	}
	.eventTags {
		display: flex;
		flex-wrap: wrap;
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
