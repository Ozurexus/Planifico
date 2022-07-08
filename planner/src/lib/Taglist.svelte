<script lang="ts">
    let tags: string[] = ['gym', 'work', 'chill'];
</script>

<main>
    <div class="container">
		{#each tags as tag}
            <div class="tag">
                <p>{tag}</p>
            </div>
		{/each}
        <button>
            New tag
        </button>
	</div>
</main>

<style>
    p{
        margin: 2px;
    }
    main{
        width: 80%;
    }
    .container {
        background-color: #F4F4F4;
		display: flex;
		margin: 0px;
        height: 30px;
        align-items: center;
        border-radius: 5px;
        display: flex;
        justify-content: space-evenly;
        position: relative;
        padding: 3px;
	}
    .tag{
        box-sizing: border-box;
        border: 1px solid #6D6AF7;
        border-radius: 5px;
        background-color: #6D6AF7;
        color: white;
    }
    button{
        border-style: none;
        box-sizing: border-box;
        border: 1px solid #6D6AF7;
        border-radius: 3px;
        height: 18px;
        position: absolute;
        right: 5px;
    }
</style>