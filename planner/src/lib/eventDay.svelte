<script lang="ts">
	import type { CalendarEvent } from '$lib/event';
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
					{eventDay.date.toDateString()}
				</div>
				{#each eventDay.events as event, id}
					<div class={id != 0 ? 'eventTime' : 'firstEventTime'}>{event.time}</div>
					<div class={id!=0 ? "eventTitleAndTags": "firstEventTitleAndTags"}>
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
	.table {
		display: grid;
		/* gap: 10px; */
		background-color: white;
		padding: 12px;
		border-radius: 28px;
		width: 80%;
		margin-left: 10%;
	}
    .tableHeader{
        background-color: white;
		display: grid;
		grid-template-columns: 300px 260px 1fr;
		font-size: 25px;
        padding: 17px;
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
		background-color: white;
		padding: 17px;
	}
	.eventTime {
		border-top: 1px solid #dfdfdf;
		background-color: white;
		padding: 17px;
	}
	.firstEventTime {
		background-color: white;
		padding: 17px;
	}
	.eventTitleAndTags {
		border-top: 1px solid #dfdfdf;
		display: flex;
		justify-content: space-between;
		background-color: white;
		padding: 17px;
	}
    .firstEventTitleAndTags {
		display: flex;
		justify-content: space-between;
		background-color: white;
		padding: 17px;
	}
	.eventTags {
		display: flex;
		flex-wrap: wrap;
	}
    .eventTitle{
        display: flex;
        flex-wrap: wrap;
    }
	.eventTag {
		margin: 5px;
	}
</style>
