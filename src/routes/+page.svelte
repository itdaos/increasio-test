<script lang="ts">
	import { onMount } from 'svelte';
	import Analytics from '../lib/Analytics.svelte';
	import Category from '../lib/Category.svelte';
	import DashboardStat from '../lib/DashboardStat.svelte';
	import { categories, categoriesEmojiMap } from '../mock/categories.mock';

	let currCategories: ICategoryData[] = [];
	let selectedCategory = 'Newest';

	onMount(async () => {
		// mock fetching the categories
		currCategories = categories;
	});

	const setSelectedCategory = (newCategory: string) => {
		selectedCategory = newCategory;
	};

	$: selectedDataset =
		currCategories.find((el) => el.name === selectedCategory)?.yearlyIncomeData || [];
</script>

<h1 class="text-3xl font-bold mb-6">Dashboard</h1>

<h2 class="text-xl font-bold mb-3">Categories</h2>
<section class="categories flex flex-row space-x-6">
	{#each currCategories as category}
		<Category
			display={categoriesEmojiMap[category.name] || categoriesEmojiMap['default']}
			title={category.name}
			active={selectedCategory === category.name}
			on:click={() => setSelectedCategory(category.name)}
		/>
	{/each}
</section>

<section class="flex flex-row basis-3/4 grow space-x-6 mt-6">
	<div class="chart grow flex flex-col space-y-6">
		<h2 class="text-xl font-bold">Analytics</h2>
		<Analytics dataset={selectedDataset} year={2022} />
	</div>
	<div class="results basis-1/3 flex flex-col space-y-6">
		<h2 class="text-xl font-bold">Results</h2>
		<DashboardStat title={'Average Revenue'} avg={120} trend={0.5} />
		<DashboardStat title={'Average Income'} avg={500} trend={0.5} />
		<DashboardStat title={'Average Outcome'} avg={378} trend={-0.5} />
	</div>
</section>

<style></style>
