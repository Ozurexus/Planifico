<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SveltyPicker from 'svelty-picker';

	let myDate: string = '12-Jul-2022 14:35';
	
	const dispatch = createEventDispatcher();
	function sendDate() {
		console.log('sendDate');
		dispatch('sendDate', { myDate });
	}
</script>

<SveltyPicker
	inputClasses="form-control"
	format="dd-M-yyyy hh:ii"
	bind:value={myDate}
	on:change={sendDate}
/>
