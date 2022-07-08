<script lang="ts">
    import Popup from "$lib/Popup.svelte";
    $: shown = false

    $: events = ["shalom", "hava", "nagila"];

    
    function showPopup(){
        shown = true;     
    }
    function addNewEvent(event:any){
        shown = false;
        events = [...events, event.detail.eventName];
        console.log(events);
        console.log("new event added");
    }

</script>

<main>
    <div class="popup" >

    </div>
    <button on:click="{showPopup}">New event</button>
    {#if shown}
        <Popup on:send={addNewEvent} />
    {/if}
    <div class="container">
        <p>Date Time Event</p>
        {#each events as event}
            <p>{event}</p>
        {/each}
    </div>
</main>

