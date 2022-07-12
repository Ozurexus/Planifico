<script lang="ts">
	import type { Client } from '@microsoft/microsoft-graph-client';
	import ButtonSignOut from '../lib/ButtonSignOut.svelte';
	import { isAuth } from '../internal/middleware';
	import { getCurrentCalendar, newEventCalendar } from '../internal/out';
	import { CalendarEvent } from '../internal/event';
	import { onMount } from 'svelte';
	import { routes } from '../internal/config';

	onMount(() => {
		if (!isAuth()) {
			location.replace(routes.basePage);
		}
	});

	async function getCalendar() {
		let item1 = localStorage.getItem('currentAccount');
		const curAccount = JSON.parse(item1!);

		const events = await getCurrentCalendar(curAccount);
	}
</script>

<h1 class="welcome-text">
	Welcome! <br /> Choose what you want to do:
</h1>

<div class="wrapper">
	<div class="box-calendar">
		<button class="button-calendar">
			<a class="cal-text" href="/calendar">Use Online Calendar</a>
		</button>
		<br />
		<img src="/static/man.png" alt="man" class="image-man" />
		<ul class="cal-list">
			<li>Organize your week plan</li>
			<li>Add and remove events with ease</li>
			<li>Create custom-made tags</li>
		</ul>
	</div>

	<div class="box-todo">
		<button class="button-calendar">
			<a class="cal-text" href="/todo">Use To-do List</a>
		</button>
		<br />
		<img src="/static/girl.png" alt="girl" class="image-girl" />
		<ul class="todo-list">
			<li>Keep track of all chores</li>
			<li>Add and remove tasks to the list</li>
			<li>Check off tasks with a single click</li>
		</ul>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
	}
	.welcome-text {
		color: white;
		font-family: 'Lato';
		font-weight: 600;
		font-size: 35px;
		text-align: center;
	}

	.box-calendar {
		margin-top: 30px;
		margin-left: 10%;
		height: 40%;
		width: 35%;
		background-color: white;
		border-radius: 27px;
	}
	.button-calendar:hover {
		background-color: #605edc;
	}
	.button-calendar {
		margin-top: 20px;
		position: relative;
		left: 50%;
		transform: translate(-50%, 0);
		cursor: pointer;
		border-radius: 34px;
		height: 68px;
		width: 339px;
		box-shadow: 0px 4px 4px #00000040;
		outline: none;
		background-color: rgba(109, 106, 247, 1);
		border: 0;
	}
	.cal-text {
		color: white;
		text-decoration: none;
		font-size: 30px;
		font-family: 'Lato';
		font-weight: 600;
	}
	.cal-list {
		color: rgba(109, 106, 247, 1);
		font-family: 'Lato';
		font-size: 20px;
		font-weight: 600;
		margin-top: 5px;
		padding-bottom: 15px;
	}
	.box-todo {
		margin-top: 30px;
		margin-left: 10%;
		height: 40%;
		width: 35%;
		background-color: white;
		border-radius: 27px;
	}

	.image-man {
		margin-top: 6px;
		height: 250px;
		margin-left: 40px;
	}
	.image-girl {
		margin-top: -45px;
		margin-left: 40px;
		height: 360px;
	}
	.todo-list {
		color: rgba(109, 106, 247, 1);
		font-family: 'Lato';
		font-size: 20px;
		font-weight: 600;
		margin-top: -52px;
		padding-bottom: 15px;
	}
</style>
