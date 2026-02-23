import { slugFromPath } from '$lib/slugFromPath';

export const POSTS_PER_PAGE = 3;

export const getAllPosts = async () => {
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
	const publishedPosts = posts.filter((post) => post.published);

	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return publishedPosts;
};

export function pageHref(page: number): string {
	return page === 1 ? '/' : `/${page}`;
}

export function getPaginationItems(
	page: number,
	totalPages: number
): (number | null)[] {
	if (totalPages <= 1) return [1];

	const delta = 2;
	const range: (number | null)[] = [];

	for (
		let i = Math.max(2, page - delta);
		i <= Math.min(totalPages - 1, page + delta);
		i++
	) {
		range.push(i);
	}

	if ((range[0] as number) > 2) range.unshift(null);
	if ((range.at(-1) as number) < totalPages - 1) range.push(null);

	return [1, ...range, totalPages];
}
