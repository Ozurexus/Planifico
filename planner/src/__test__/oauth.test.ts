/**
 * @jest-environment jsdom
 */

import { isAuth } from '../internal/middleware';
import { render } from '@testing-library/svelte';

test(`checking is "middleware"`, async () => {
	localStorage.setItem('authorized', 'true');
	expect(isAuth()).toBe(true);
});
