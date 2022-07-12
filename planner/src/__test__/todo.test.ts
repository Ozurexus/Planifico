/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import todo from '../routes/todo.svelte';

describe('root', () => {
  it('should be rendered', async () => {
    const container = render(todo);
    expect(container).toBeTruthy();
  });
});
