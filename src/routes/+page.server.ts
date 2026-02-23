import { getAllPosts, POSTS_PER_PAGE } from '$lib/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await getAllPosts();
	const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
	const pagePosts = posts.slice(0, POSTS_PER_PAGE);

	return { posts: pagePosts, page: 1, totalPages };
};
