<script lang="ts">
	import { pageHref, getPaginationItems } from '$lib/posts';

	interface Props {
		page: number;
		totalPages: number;
	}

	const { page, totalPages }: Props = $props();
	let items = $derived(getPaginationItems(page, totalPages));
</script>

<nav aria-label="Pagination">
	{#if page > 1}
		<a href={pageHref(1)} aria-label="First">&laquo;</a>
		<a href={pageHref(page - 1)} aria-label="Previous">&lsaquo;</a>
	{:else}
		<span aria-disabled="true">&laquo;</span>
		<span aria-disabled="true">&lsaquo;</span>
	{/if}

	{#each items as item}
		{#if item === null}
			<span aria-hidden="true">…</span>
		{:else if item === page}
			<strong aria-current="page">{item}</strong>
		{:else}
			<a href={pageHref(item)}>{item}</a>
		{/if}
	{/each}

	{#if page < totalPages}
		<a href={pageHref(page + 1)} aria-label="Next">&rsaquo;</a>
		<a href={pageHref(totalPages)} aria-label="Last">&raquo;</a>
	{:else}
		<span aria-disabled="true">&rsaquo;</span>
		<span aria-disabled="true">&raquo;</span>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		flex-wrap: wrap;
		column-gap: 1rem;

		& strong {
			text-decoration: underline;
		}

		& a {
			display: inline-block;
			text-decoration: none;
			margin: -4px;
			padding: 4px;
		}

		& [aria-disabled='true'] {
			opacity: 50%;
		}
	}
</style>
