/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import index from '../routes/index.svelte';

describe('root', () => {
  it('should be rendered', async () => {
    const container = render(index);
    expect(container).toBeTruthy();
  });
});
