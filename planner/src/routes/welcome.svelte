<script lang='ts'>
    import type { Client } from "@microsoft/microsoft-graph-client";
    import ButtonSignOut from "../components/ButtonSignOut.svelte";
    import {isAuth} from "../lib/middleware"
    import {getCurrentCalendar, getCurrentWeekStart, getCurrentWeekEnd} from "../lib/out";

    // это проверка, что юзер зашел!!!
    import { onMount } from "svelte";
    onMount(() => {
        if (!isAuth()){
            location.replace("http://localhost:3000")
        }
    })

    async function getUser(){
        let item1 = localStorage.getItem("currentAccount")
        const curAccount = JSON.parse(item1!);
        const user = await getCurrentCalendar(curAccount)
        console.log(user);
    }

    

    async function getWeekStartEnd(){
        const start = getCurrentWeekStart();
        const end = getCurrentWeekEnd(start);

        console.log(start, end);
    }
</script>

<div>
    <button on:click={getWeekStartEnd}>
        get week Start And End
        <slot/>
    </button>
    
    <ButtonSignOut>Sign out</ButtonSignOut>

    <a href="/calendar">Get Calendar</a>
</div>