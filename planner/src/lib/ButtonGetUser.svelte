<script lang="ts">
    async function getCalendar(){
        console.log("entered calendar")
    }
</script>

<a href="/calendar">
    <button on:click={getCalendar}>
        <slot/>
    </button>
</a>
