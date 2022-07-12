/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import ButtonSignIn from '../lib/ButtonSignIn.svelte';

test('Button exist', () => {
  const { getByRole } = render(ButtonSignIn);
  const button = getByRole('button');
  expect(button).toBeVisible();
});
