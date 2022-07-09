<script lang='ts'>
    import { getCurrentUser } from "../lib/out";


    export const signOut = async () => {
        let item = localStorage.getItem("authorized")
        if (item === null){
            console.log("invalid log out")
            return
        }
        const item1 = localStorage.getItem("currentAccount")
        const curAccount = JSON.parse(item1!);
        const user = getCurrentUser(curAccount);

        localStorage.setItem("msalInstance", "");
        localStorage.setItem("currentAccount", "");
        localStorage.setItem("authorized", "false")
        console.log("user logged out in", user);
        location.replace("http://localhost:3000/")
    };   
</script>

<style>

</style>

<button on:click={signOut}>
    <slot/>
</button>