<script>
	import { A } from "$lib/components"
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/simpledotcss/simple.css" />
</svelte:head>

<main>
	<A.Heading animation="">
		Amberlyn
		{#snippet subtitle()}
			Generated components from name and props
		{/snippet}
	</A.Heading>

	<A.Hero height="50dvh" tag="section">
		<A.Modal openButtonLabel="open" $="fly in the popup">
			<p>This is a modal...</p>
		</A.Modal>
	</A.Hero>
</main>
