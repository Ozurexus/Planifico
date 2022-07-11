<script lang='ts'>
    import { getCurrentUser, signOutCurrent} from "../internal/out";


    export const signOut = async () => {
        await signOutCurrent()
        let item = localStorage.getItem("authorized")
        if (item === null){
            console.log("invalid log out")
            return
        }
        const item1 = localStorage.getItem("currentAccount")
        const curAccount = JSON.parse(item1!);
        const user = getCurrentUser(curAccount);

        localStorage.clear();
        console.log("user logged out in", user);
        location.replace("http://localhost:3000/")
    };   
</script>

<button class="signout-button" on:click={signOut}>
    <slot/>
</button>

<style>
    .signout-button:hover{
        color: pink;
    }
    .signout-button{
        color: white;
        background-color: transparent;
        border: none;
        font-size: 19px;
        font-weight: 600;
    }
</style>