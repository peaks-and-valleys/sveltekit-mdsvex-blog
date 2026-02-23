import type { RequestHandler } from './$types';
import { slugFromPath } from '$lib/slugFromPath';

export const GET: RequestHandler = async ({ url }) => {
	const modules = import.meta.glob(`/src/posts/*.{md,svx,svelte.md}`);

	const postPromises = Object.entries(modules).map(([path, resolver]) =>
		resolver().then(
			(post) =>
				({
					slug: slugFromPath(path),
					...(post as unknown as App.MdsvexFile).metadata
				}) as App.BlogPost
		)
	);

	const posts = await Promise.all(postPromises);
	const published = posts.filter((p) => p.published);

	// sort newest first
	published.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	const offset = Math.max(0, parseInt(url.searchParams.get('offset') ?? '0'));
	const limit = Math.max(1, parseInt(url.searchParams.get('limit') ?? '10'));

	const sliced = published.slice(offset, offset + limit);

	return new Response(JSON.stringify({ posts: sliced }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
