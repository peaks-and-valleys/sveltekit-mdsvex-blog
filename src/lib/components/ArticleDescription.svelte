<script lang="ts">
	interface Props {
		description: string;
		slug?: string;
	}

	let { description, slug = '' }: Props = $props();

	const href = slug && `/posts/${slug}`;
</script>

<p>
	{description}

	{#if slug}
		<a {href}>Read More &rarr;</a>
	{/if}
</p>

<style>
	p {
		margin: 0;
		margin-bottom: calc(var(--spacing-unit) * 8);
	}
</style>
