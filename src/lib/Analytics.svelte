<script lang="ts">
	import { Line } from 'svelte-chartjs';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';
	import { onMount } from 'svelte';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

	export let dataset: IYearlyIncomeData[];
	export let year: number;

	const chartOptions = {};

	//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	$: cleanDatasetThisYear = dataset
		.find((el) => el.year === year)
		?.monthlyIncomeData.reduce((acc: number[], curr: IMonthlyIncomeData) => {
			return [...acc, ...curr.dailyIncomeData.map((el) => el.revenue)];
		}, [])
		.map((_, index, series) => {
			const windowSize = 20;
			if (index < windowSize - 1) {
				return null; // Padding null values for the initial window
			}
			const window = series.slice(index - windowSize + 1, index + 1);
			const average = window.reduce((sum, num) => sum + num, 0) / windowSize;
			return average;
		})
		.slice(20);

	$: cleanDatasetLastYear = dataset
		.find((el) => el.year === year - 1)
		?.monthlyIncomeData.reduce((acc: number[], curr: IMonthlyIncomeData) => {
			return [...acc, ...curr.dailyIncomeData.map((el) => el.revenue)];
		}, [])
		.map((_, index, series) => {
			const windowSize = 20;
			if (index < windowSize - 1) {
				return null; // Padding null values for the initial window
			}
			const window = series.slice(index - windowSize + 1, index + 1);
			const average = window.reduce((sum, num) => sum + num, 0) / windowSize;
			return average;
		})
		.slice(20);

	$: labels = cleanDatasetThisYear?.map((_, idx) => (idx + 1).toString());

	$: data = {
		labels: labels,
		datasets: [
			{
				label: 'Income',
				fill: false,
				cubicInterpolationMode: 'monotone',
				tension: 0.4,
				backgroundColor: 'rgba(225, 204,230, .3)',
				borderColor: 'rgba(255, 255, 255, .8)',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				data: cleanDatasetThisYear
			},
			{
				label: 'Last Year Income',
				fill: false,
				cubicInterpolationMode: 'monotone',
				tension: 0.4,
				backgroundColor: 'rgba(184, 185, 210, .3)',
				borderColor: 'rgb(35, 26, 136)',
				borderDash: [10, 10],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				data: cleanDatasetLastYear
			}
		]
	};
</script>

<div class="analytics relative h-full flex flex-col bg-core p-6 rounded-3xl justify-center">
	{#if cleanDatasetThisYear}
		<Line bind:data options={{ ...chartOptions, responsive: true, maintainAspectRatio: false }} />
	{/if}
</div>
