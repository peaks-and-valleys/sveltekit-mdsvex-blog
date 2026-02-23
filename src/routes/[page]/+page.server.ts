import { getAllPosts, POSTS_PER_PAGE } from '$lib/posts';
import { error, redirect } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = async () => {
	const posts = await getAllPosts();
	const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
	// /1 は生成しない（/ が担当）
	return Array.from({ length: totalPages - 1 }, (_, i) => ({
		page: String(i + 2)
	}));
};

export const load: PageServerLoad = async ({ params }) => {
	const page = Number(params.page);

	if (page === 1) redirect(301, '/');

	const posts = await getAllPosts();
	const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

	if (isNaN(page) || page < 2 || page > totalPages) {
		error(404, 'Page not found');
	}

	const start = (page - 1) * POSTS_PER_PAGE;
	const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);

	return { posts: pagePosts, page, totalPages };
};
