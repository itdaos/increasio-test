<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let display: string;
	export let title: string;
	export let active: boolean;
</script>

<div class="flex flex-col">
	<button
		class="category rounded-3xl p-6 text-center bg-accent border-8 border-core cursor-pointer"
		class:active
		on:click
	>
		<span class="emoji text-4xl">{display}</span>
	</button>
	<span class="text-center">{title}</span>
</div>

<style>
	.category.active {
		border-color: #2f2f6b;
	}
</style>
