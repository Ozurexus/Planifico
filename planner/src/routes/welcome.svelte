<script lang='ts'>
    import type { Client } from "@microsoft/microsoft-graph-client";
    import ButtonSignOut from "../lib/ButtonSignOut.svelte";
    import {isAuth} from "../internal/middleware"
    import {getCurrentCalendar} from "../internal/out";

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
</script>

<div>
    <button on:click={getCalendar}>
        get week Start And End
        <slot/>
    </button>
    
    <ButtonSignOut>Sign out</ButtonSignOut>

    <a href="/calendar">Get Calendar</a>
</div>