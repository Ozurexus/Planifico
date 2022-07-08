<script lang="ts">
    import { createEventDispatcher } from "svelte";
    let tags:string[] = ["gym", "work", "chill"];
    let eventName:string = "bruch you didnt enter anything";
    const dispatch = createEventDispatcher();
    function send(){
        console.log("send");
        dispatch('send', {eventName})
    }
</script>

<main>
    <h1>Add new event</h1>
    <input type="text" bind:value={eventName}>
    <p>Choose a date</p>
    <p>Select a tag</p>
    <div class="container">
        {#each tags as tag}
            <p>{tag}</p>
        {/each}
    </div>
    <button on:click={send}>Add</button>
</main>

<style>

</style>