<script lang="ts">
	import '../styles/global.css';
	let activeElem: string = 'home';
	let items: { href: string; name: string; id: number }[] = [{ href: "", name: 'home', id: 0 }, { href: "TODO", name: 'To-do list', id: 1 }, {href: "calendar", name: 'calendar', id: 2 }];
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
	</div>

	<slot />
</main>

<style>
	.topnav {
		background-color: #6D6AF7;
		overflow: hidden;
        display: flex;
		justify-content: center;
	}

	/* Style the links inside the navigation bar */
	.topnav a {
		float: left;
		color: #f2f2f2;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
		font-size: 17px;
	}

	/* Change the color of links on hover */
	.topnav a.non-active {
			background-color: #6D6AF7;
	}

	/* Add a color to the active/current link */
	.topnav a.active {
		background-color: rgba(0, 0, 0, 0.1);
		color: white;
	}
</style>
