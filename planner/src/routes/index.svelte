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

<div>
    <ButtonSignIn>Sign in using mail</ButtonSignIn>
</div>