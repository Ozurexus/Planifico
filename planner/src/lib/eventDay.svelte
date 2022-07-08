<script lang="ts">
	import type { CalendarEvent } from '$lib/event';
	export let eventDays: {
		date: Date;
		events: CalendarEvent[];
	}[];
</script>

<main>
	<div class="table">
		{#each eventDays as eventDay, id}
			<div class="background-day">
				{#if id == 0}
					<div>Date</div>
					<div>Time</div>
					<div>Event</div>
				{:else}
					<div class="eventsDate" style="grid-row: 1/{eventDay.events.length + 1}">
						{eventDay.date.toDateString()}
					</div>
					{#each eventDay.events as event}
						<div class="eventTime">{event.time}</div>
						<div class="eventTitleAndTags">
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
				{/if}
			</div>
		{/each}
	</div>
</main>

<style>
	.table {
		display: grid;
		/* gap: 10px; */
		background-color: white;
		padding: 12px;
		border-radius: 28px;
		width: 80%;
		margin-left: 10%;
	}
	.background-day {
		background-color: white;
		display: grid;
		grid-template-columns: 300px 260px 1fr;
		font-size: 25px;
		/* gap:10px; */
		border-top: 3px solid #dfdfdf;
	}
	.eventsDate {
		background-color: green;
		padding: 17px;
	}
	.eventTime {
		background-color: red;
		padding: 17px;
	}
	.eventTitleAndTags {
		display: flex;
		justify-content: space-between;
		background-color: blue;
		padding: 17px;
	}
	.eventTags {
		display: flex;
		flex-wrap: wrap;
	}
	.eventTag {
		margin: 5px;
	}
</style>
