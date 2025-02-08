<script lang="ts">
	import type { Snippet } from "svelte"
	import { useComponentName } from "./setComponentName.js"
	import { getComponentData } from "$lib/amberlinClient"

	const {
		children
	}: {
		children?: Snippet
	} = $props()

	const componentName = useComponentName()

	let tag = $state<keyof SvelteHTMLElements>("div")

	async function loadComponent() {
		if (!componentName) return
		const { component } = await getComponentData(componentName)
		if (!component) return
		tag = component.tag
	}

	$effect(() => {
		loadComponent()
	})
</script>

{#if tag}
	<svelte:boundary>
		<svelte:element this={tag}>
			{@render children?.()}
		</svelte:element>
	</svelte:boundary>
{/if}
