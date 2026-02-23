<script lang="ts">
	import type { PageData } from './$types';
	import type { Component } from 'svelte';

	import PageHead from '$lib/components/PageHead.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let component = $derived(data.component as Component);

	const SvelteComponent = $derived(component);
</script>

<PageHead
	title={data.frontmatter.title}
	description={data.frontmatter.description}
/>
<ArticleTitle title={data.frontmatter.title} />
<ArticleMeta author={data.frontmatter.author} date={data.frontmatter.date} />

<SvelteComponent />
