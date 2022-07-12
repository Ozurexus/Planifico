/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import ButtonSignOut from '../lib/ButtonSignOut.svelte';

test('Button exist', () => {
  const { getByRole } = render(ButtonSignOut);
  const button = getByRole('button');
  expect(button).toBeVisible();
});
