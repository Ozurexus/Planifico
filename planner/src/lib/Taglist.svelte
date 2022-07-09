<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let tags: string[] = [];
	let shown: boolean = false;
	let tagName: string = '';

	let dispatch = createEventDispatcher();
	function addTag(event: KeyboardEvent) {
		if (event.key === 'Enter' && tagName != '') {
			tags = [...tags, tagName];
			tagName = '';
		}
		dispatch('change', {tags});
	}
    function removeTag(id:number){
        tags.splice(id, 1);
        tags = tags;
		dispatch('change', {tags});
    }
</script>

<main>
	<div class="container">
		{#each tags as tag, id}
			<div class="tag">
				<p>#{tag}</p>
				<input
					on:click={()=>{removeTag(id)}}
                    id="remove-tag-btn"
					class="button"
					type="image"
					name="close_button"
					src="close_tag.png"
					alt="close button"
				/>
			</div>
		{/each}
		<button id="add-tag-btn" class="button" on:click={()=> shown=!shown}> New tag + </button>
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
		position: relative;
		display: flex;
		flex-direction: column;
	}
	.container {
		align-items: center;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.tag {
		box-sizing: border-box;
		border: 1px solid #6d6af7;
		border-radius: 5px;
		background-color: #6d6af7;
		padding-inline: 10px;
		color: white;
        display: flex;
        align-items: center;
	}
	.button {
		color: #6d6af7;
		cursor: pointer;
	}
    #remove-tag-btn{
        margin-left: 5px;
        height: 15px;
        width: 15px;
    }
	#add-tag-btn:hover{
		background-color:rgb(230,230,230);
	}
    #add-tag-btn{
        height: 25px;
        border-style: none;
		box-sizing: border-box;
		border: 1px solid #6d6af7;
		border-radius: 3px;
        background-color: white;
    }
	#input-tag {
		width: 50%;
		margin: 5px;
		align-self: center;
	}
</style>
