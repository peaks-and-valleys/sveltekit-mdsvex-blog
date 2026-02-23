<script lang="ts">
	import { page } from '$app/state';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	import './App.css';
</script>

<div class="wrapper">
	<header>
		<a href="/"><h1>SvelteKit + MDsveX Blog</h1></a>
	</header>

	<main>
		{@render children?.()}
	</main>

	<footer>
		<p>
			Copyright &#169; <a href="https://twitter.com/mehdi_vasigh"
				>Mehdi Vasigh</a
			>, {new Date().getFullYear()}
		</p>
	</footer>
</div>

<style>
	a:has(h1) {
		text-decoration: none;
	}

	h1 {
		margin-block-start: 0;
	}

	footer {
		margin-top: calc(var(--spacing-unit) * 8);
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-height: 100dvh;
		padding: calc(var(--spacing-unit) * 8);

		& main {
			flex: 1;
		}
	}
</style>
