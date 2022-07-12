/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import { isAuth } from '../internal/middleware';

test('checking is "middleware"', async () => {
  localStorage.setItem('authorized', 'true');
  expect(isAuth()).toBe(true);
});
