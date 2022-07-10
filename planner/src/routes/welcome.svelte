<script lang='ts'>
    import type { Client } from "@microsoft/microsoft-graph-client";
    import ButtonSignOut from "../lib/ButtonSignOut.svelte";
    import {isAuth} from "../internal/middleware"
    import {getCurrentCalendar, newEventCalendar} from "../internal/out";
    import { CalendarEvent } from "../internal/event";


    // это проверка, что юзер зашел!!!
    import { onMount } from "svelte";
    onMount(() => {
        if (!isAuth()){
            location.replace("http://localhost:3000")
        }
    })

    async function getCalendar(){
        let item1 = localStorage.getItem("currentAccount")
        const curAccount = JSON.parse(item1!);
        
        const events = await getCurrentCalendar(curAccount);
    }
    async function newEvent(){
        let item1 = localStorage.getItem("currentAccount")
        const curAccount = JSON.parse(item1!);
        const date = new Date('December 12, 2022 03:24:00');
        const ce = new CalendarEvent("event from app", "12:20", "16:40", ["tag1", "tag2"]);
        const events = await newEventCalendar(curAccount, date, ce);
        console.log("OK")
    }
</script>

<div>
    <button on:click={getCalendar}>
        get week Start And End
        <slot/>
    </button>

    <button on:click={newEvent}>
        new Event
        <slot/>
    </button>
    
    <ButtonSignOut>Sign out</ButtonSignOut>

    <a href="/calendar">Get Calendar</a>
</div>