<script lang="ts">
	let tags: string[] = ['gym', 'work', 'chill'];
	let shown: boolean = false;
	let tagName: string = '';
	function changeShown() {
		shown = !shown;
	}
	function addTag(event: KeyboardEvent) {
        if (event.key === 'Enter' && tagName != '') {
		    tags = [...tags, tagName];
        }
	}
</script>

<main>
	<div class="container">
		{#each tags as tag}
			<div class="tag">
				<p>#{tag}</p>
			</div>
		{/each}
		<button on:click={changeShown}> New tag + </button>
	</div>
    {#if shown}
        <input
            id="input-tag"
            type="text"
            placeholder="Type tag name"
            bind:value={tagName}
            on:keydown={addTag}
        />
    {/if}
</main>

<style>
	p {
		margin: 2px;
	}
	main {
		width: 80%;
        background-color: #f4f4f4;
        border-radius: 5px;
        padding: 5px;
	}
	.container {
		display: flex;
		align-items: center;
		display: flex;
		justify-content: space-evenly;
		position: relative;
	}
	.tag {
		box-sizing: border-box;
		border: 1px solid #6d6af7;
		border-radius: 5px;
		background-color: #6d6af7;
        padding-inline: 10px;
		color: white;
	}
	button {
		border-style: none;
		box-sizing: border-box;
		border: 1px solid #6d6af7;
		border-radius: 3px;
		height: 25px;
		background-color: white;
		color: #6d6af7;
		cursor: pointer;
		position: absolute;
		right: 5px;
	}
</style>
