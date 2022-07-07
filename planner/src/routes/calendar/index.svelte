<script lang="ts">
	function send() {}
</script>

<main>
	<div class="new-event-button">
		<button class="event-button" on:click={send}
			><div class="button-content">
				New event<img class="plus-image" src="plus.png" alt="plus" />
			</div></button
		>
	</div>
	<div class="container">
		<p>Date Time Event</p>
	</div>
</main>

<style>
	.new-event-button {
		margin-top: 3%;
		display: flex;
		justify-content: center;
	}
	.event-button {
		background-color: #6d6af7;
		display: inline;
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
