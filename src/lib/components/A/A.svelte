<script lang="ts">
	import type { Snippet } from "svelte"
	import { useComponentName } from "./setComponentName.js"
	import { AmberlynClient } from "$lib/amberlinClient"

	const props: {
		children?: Snippet
	} = $props()

	const componentName = useComponentName()

	let GeneratedComponent: any = $state()

	async function loadComponent() {
		if (!componentName) return

		const client = new AmberlynClient()

		const { component } = (await client.getComponent(componentName, props)) ?? {}
		if (!component) return

		import(component.filename)
			.then((module) => {
				GeneratedComponent = module.default
			})
			.catch(console.error)
	}

	$effect(() => {
		loadComponent()
	})
</script>

{#if GeneratedComponent}
	<svelte:boundary><GeneratedComponent {...props} /></svelte:boundary>
{:else}
	<p>loading... {componentName}</p>
{/if}
