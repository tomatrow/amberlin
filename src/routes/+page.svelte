<script>
	import { A } from "$lib/components"
</script>

<A.Title label="hello" />

<A.Heading>Hello</A.Heading>

<A.PopupModal openButtonLabel="open">
	<A.Prose useProseStyles>
		<p>This is a modal...</p>
	</A.Prose>
</A.PopupModal>

<A.Hero bg="red" height="10rem">
	{#snippet header()}
		Acquisitions Incorperated
	{/snippet}
	{#snippet footer()}
		Call us
	{/snippet}
</A.Hero>
