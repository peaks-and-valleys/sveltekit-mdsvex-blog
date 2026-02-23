// src/lib/posts.test.ts
import { describe, it, expect } from 'vitest';
import { pageHref, getPaginationItems } from './posts';

describe('pageHref', () => {
	it('returns / for page 1', () => {
		expect(pageHref(1)).toBe('/');
	});

	it('returns /page/2 for page 2', () => {
		expect(pageHref(2)).toBe('/2');
	});

	it('returns /page/10 for page 10', () => {
		expect(pageHref(10)).toBe('/10');
	});
});

describe('getPaginationItems', () => {
	it('returns [1] when total pages is 1', () => {
		expect(getPaginationItems(1, 1)).toEqual([1]);
	});

	it('returns [1, 2] when total pages is 2', () => {
		expect(getPaginationItems(1, 2)).toEqual([1, 2]);
		expect(getPaginationItems(2, 2)).toEqual([1, 2]);
	});

	it('adds ellipsis only at the end when near the first page', () => {
		expect(getPaginationItems(1, 10)).toEqual([1, 2, 3, null, 10]);
		expect(getPaginationItems(2, 10)).toEqual([1, 2, 3, 4, null, 10]);
		expect(getPaginationItems(3, 10)).toEqual([1, 2, 3, 4, 5, null, 10]);
	});

	it('adds ellipsis only at the start when near the last page', () => {
		expect(getPaginationItems(10, 10)).toEqual([1, null, 8, 9, 10]);
		expect(getPaginationItems(9, 10)).toEqual([1, null, 7, 8, 9, 10]);
		expect(getPaginationItems(8, 10)).toEqual([1, null, 6, 7, 8, 9, 10]);
	});

	it('adds ellipsis on both sides when in the middle', () => {
		expect(getPaginationItems(6, 10)).toEqual([
			1,
			null,
			4,
			5,
			6,
			7,
			8,
			null,
			10
		]);
		expect(getPaginationItems(5, 10)).toEqual([
			1,
			null,
			3,
			4,
			5,
			6,
			7,
			null,
			10
		]);
	});

	it('always includes the first and last page', () => {
		const items = getPaginationItems(6, 10);
		expect(items[0]).toBe(1);
		expect(items.at(-1)).toBe(10);
	});

	it('contains no duplicate page numbers', () => {
		for (let page = 1; page <= 10; page++) {
			const items = getPaginationItems(page, 10).filter((i) => i !== null);
			const unique = new Set(items);
			expect(unique.size).toBe(items.length);
		}
	});

	it('page numbers are in ascending order', () => {
		for (let page = 1; page <= 10; page++) {
			const numbers = getPaginationItems(page, 10).filter(
				(i): i is number => i !== null
			);
			expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
		}
	});
});
