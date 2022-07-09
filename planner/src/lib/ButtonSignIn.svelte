<script lang="ts">
    import { config as conf} from "../internal/config";
    import { getUser} from "../internal/graph";
    import {PublicClientApplication} from "@azure/msal-browser";
    import {InteractionType} from "@azure/msal-browser";
    import type { User, Event } from 'microsoft-graph';
    import { AuthCodeMSALBrowserAuthenticationProvider} from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
    import type { AccountInfo } from "@azure/msal-browser";
    import { onMount, setContext } from "svelte";
    import { Client} from '@microsoft/microsoft-graph-client';
    import { getCurrentUser } from "../internal/out";

    export const msalInstance = new PublicClientApplication({
        auth: {
        clientId: conf.appId,
        authority: conf.auth.authority,
        redirectUri: conf.redirectUri
        },
        cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true
        }
    });

    let graphClient: Client | undefined = undefined;
    const currentAccount = {} as AccountInfo;
    export const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        msalInstance, {
            account: currentAccount,
            scopes: conf.scopes,
            interactionType: InteractionType.Popup
        });

    export const signIn = async () => {
        console.log("signing in")
        const loginRequest = {
            scopes: conf.scopes
        };
        await msalInstance.loginPopup(loginRequest)

        let user: User = {} as User;
        graphClient = Client.initWithMiddleware({
            authProvider: authProvider
        });

        await getUser(authProvider)
            .then((userDone: User) =>{
                user = userDone;
                location.replace("http://localhost:3000/welcome")
            })

        msalInstance.setActiveAccount(currentAccount);
        console.log(user, " has logged in");
        
        console.log("set auth vars")

        localStorage.setItem("authorized", JSON.stringify(true))
        localStorage.setItem("msalInstance", JSON.stringify(msalInstance))
        localStorage.setItem("currentAccount", JSON.stringify(currentAccount))
    }


</script>

<style>
    
</style>

<button on:click={signIn}>
    <slot/>
</button>
