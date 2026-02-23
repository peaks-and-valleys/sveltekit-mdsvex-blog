<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<article>
	{@render children?.()}
</article>

<style>
	article {
		margin-bottom: calc(var(--spacing-unit) * 8);
	}
</style>
