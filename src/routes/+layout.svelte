<script lang="ts">
	import '../app.css';
</script>

<div class="w-full min-h-screen h-full flex flex-row items-stretch">
	<nav
		class="basis-20 flex flex-col items-center p-6 space-y-3 rounded-r-lg bg-neutral-100 min-h-screen"
	>
		<div class="rounded-full aspect-square mb-2">
			<img src="inc-icon.png" alt="" srcset="" />
		</div>
		<a href="/"><span class="material-icons md-dark">person</span></a>
		<a href="/settings"><span class="material-icons md-dark">settings</span></a>
	</nav>
	<main class="w-full p-8 grow flex flex-col">
		<slot />
	</main>
</div>
