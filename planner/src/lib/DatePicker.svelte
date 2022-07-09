<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SveltyPicker from 'svelty-picker';

	let date: string = '12 Jul 2022';
	let timeStart:string = "04:20";
	let timeEnd:string = "13:37";
	
	const dispatch = createEventDispatcher();
	function sendDate() {
		console.log('sendDate');
		dispatch('sendDate', { date, timeStart, timeEnd });
	}
</script>

<p>Choose a date</p>
<SveltyPicker
	inputClasses="form-control"
	format="dd M yyyy"
	bind:value={date}
	on:change={sendDate}
	on:create={sendDate}
/>
<p>Start time:</p>
<SveltyPicker
	inputClasses="form-control"
	format="hh:ii"
	bind:value={timeStart}
	on:input={sendDate}
/>
<p>End time:</p>
<SveltyPicker
	inputClasses="form-control"
	format="hh:ii"
	bind:value={timeEnd}
	on:input={sendDate}
/>
