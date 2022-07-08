<script lang="ts">
	import { CalendarEvent } from '$lib/event';
	export let eventDay: {
		date: Date;
		events: CalendarEvent[];
	};

</script>
<main>
    <div class = "background">
        {eventDay.date.toDateString()}
    </div>
</main>
<style>
    .background{
        background-color: white;
    }
</style>