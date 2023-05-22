<script lang="ts">
	export let trend: number;
	export let title: string;
	export let avg: number;
</script>

<div
	class="agg-res flex flex-row basis-1/3 justify-between items-center rounded-3xl bg-core px-6 space-x-6"
>
	<div class="img-container w-32 h-32 rounded-xl bg-neutral-200" />

	<div class="agg-stats flex flex-col justify-center space-y-2 grow">
		<span>{title}</span>
		<span class="text-5xl">{`$${avg}K`}</span>
		<a href="#avg-rev" class="text-green-600">Click now</a>
	</div>
	<div class="trend flex items-center space-x-1 text-sm">
		{#if trend > 0}
			<span class="material-icons text-green-600">trending_up</span>
			<span class="text-green-600">{`${trend}%`}</span>
		{:else}
			<span class="material-icons text-red-600">trending_down</span>
			<span class="text-red-600">{`${Math.abs(trend)}%`}</span>
		{/if}
	</div>
</div>
