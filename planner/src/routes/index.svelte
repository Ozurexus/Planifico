<script>
    import ButtonSignIn from "../lib/ButtonSignIn.svelte"
    import {isAuth} from "../internal/middleware"

    // это проверка, что юзер зашел!!!
    import { onMount } from "svelte";
    onMount(() => {
        if (isAuth()){
            location.replace("http://localhost:3000/welcome")
        }
    })
</script>

<h1 class="title"> 
    Be efficient with PLANIFICO
</h1>
<h2 class="subtitle">
    Use our online calendar and to-do list to take <br/> control under your life
</h2>
<p class="text">
    Login With
</p>

<div class="button">
    <ButtonSignIn>Outlook</ButtonSignIn>
</div>    

<style>
    .title{
        color: white;
        font-family: 'Lato';
        font-weight: 800;
        font-size: 70px;
        text-align: center;
        text-shadow: 0px 4px 4px #00000040;
        margin-top: 100px;
    }
    .subtitle{
        color: white;
        font-family: 'Lato';
        font-weight: 500;
        font-size: 35px;
        text-align: center;
        margin-top: -30px;
    }
    
    .text{
        color: white;
        font-family: 'Lato';
        font-weight: 500;
        font-size: 30px;
        text-align: center;
        margin-top: 40px;
    }


</style>