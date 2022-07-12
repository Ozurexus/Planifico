<script lang="ts">
	import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
	import type { User, Event } from 'microsoft-graph';
	import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
	import type { AccountInfo } from '@azure/msal-browser';
	import { onMount, setContext } from 'svelte';
	import { Client } from '@microsoft/microsoft-graph-client';
	import { getUser } from '../internal/graph';
	import { config as conf } from '../internal/config';
	import { getCurrentUser } from '../internal/out';

	export const msalInstance = new PublicClientApplication({
	  auth: {
	    clientId: conf.appId,
	    authority: conf.auth.authority,
	    redirectUri: conf.redirectUri,
	  },
	  cache: {
	    cacheLocation: 'sessionStorage',
	    storeAuthStateInCookie: true,
	  },
	});

	let graphClient: Client | undefined;
	const currentAccount = {} as AccountInfo;
	export const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msalInstance, {
	  account: currentAccount,
	  scopes: conf.scopes,
	  interactionType: InteractionType.Popup,
	});

	export const signIn = async () => {
	  console.log('signing in');
	  const loginRequest = {
	    scopes: conf.scopes,
	  };
	  await msalInstance.loginPopup(loginRequest);

	  let user: User = {} as User;
	  graphClient = Client.initWithMiddleware({
	    authProvider,
	  });

	  await getUser(authProvider).then((userDone: User) => {
	    user = userDone;
	    location.replace('http://localhost:3000/welcome');
	  });

	  msalInstance.setActiveAccount(currentAccount);
	  console.log(user, ' has logged in');

	  console.log('set auth vars');

	  localStorage.setItem('authorized', 'true');
	  localStorage.setItem('msalInstance', JSON.stringify(msalInstance));
	  localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
	  localStorage.setItem('user', JSON.stringify(user));
	};
</script>

<button class="signin" on:click={signIn}>
	<div class="text">
		<slot />
	</div>
	<img src="out.png" alt="outlook" class="image-out" />
</button>

<style>
	.signin {
		margin-top: -20px;
		position: relative;
		left: 50%;
		transform: translate(-50%, 0);
		cursor: pointer;
		border-radius: 34px;
		height: 68px;
		width: 280px;
		box-shadow: 0px 4px 4px #00000040;
		outline: none;
		background-color: white;
		border: 0;
		color: rgba(109, 106, 247, 1);
		font-family: 'Lato';
		font-size: 35px;
		font-weight: 600;
		display: flex;
	}

	.signin:hover {
		background-color: #e2e2e2;
	}

	.image-out {
		margin-left: auto;
		margin-right: 10px;
		height: 75px;
		margin-top: -5px;
	}
	.text {
		margin-top: 10px;
		margin-left: 42px;
		margin-right: auto;
	}
</style>
