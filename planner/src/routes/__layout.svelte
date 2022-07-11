<script lang="ts">
	import '../styles/global.css';
	import ButtonSignOut from "../lib/ButtonSignOut.svelte";
	import {isAuth} from "../internal/middleware"

	let activeElem: string = 'home';
	import { onMount } from "svelte";
	let items: { href: string; name: string; id: number }[] = [{ href: '', name: '  ', id: 0}];
	let authorized: boolean = false;
    onMount(async () => {
        if (isAuth()){
			authorized = true;
            items = [{ href: '', name: 'PLANIFICO', id: 0 },
					{ href: 'calendar', name: 'calendar', id: 2 },
					{ href: 'todo', name: 'To-do list', id: 1 },]
			
        }else{
			items = [{ href: '', name: 'PLANIFICO', id: 0 }]
		}
    })
</script>

<main>
	<div class="topnav">
		{#each items as item}
			<a
				href="./{item.href}"
				class={item.name === activeElem ? 'active' : 'non-active'}
				on:click={() => {
					activeElem = item.name;
				}}
				>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}
				<!-- Capitalize first letter -->
			</a>
		{/each}
		
		{#if authorized}
			<div class="signout">
				<ButtonSignOut>Logout</ButtonSignOut>
			</div>
		{/if}
		
	</div>

	<slot />
</main>

<style>
	@import
	url("https://fonts.googleapis.com/css?family=Oswald:500,600|Lato:700,400,500,600,800");

	.signout{
		margin-top: 13px;
		margin-left: auto;
		margin-right: 15px;
    }

	.topnav {
		background-color: #6d6af7;
		overflow: hidden;
		display: flex;
		justify-content:left;
		font-family: Lato;
		font-weight: 600;
		padding-left: 50px;
	}

	/* Style the links inside the navigation bar */
	.topnav a {
		float: left;
		color: white;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
		font-size: 20px;
		margin-right: 20px;
	}
	.topnav a:hover{
		color:pink;
	}

	/* Change the color of links on hover */
	.topnav a.non-active {
		background-color: #6d6af7;
	}

	/* Add a color to the active/current link */
	.topnav a.active {
		background-color: rgba(0, 0, 0, 0.1);
		color: white;
	}
</style>
