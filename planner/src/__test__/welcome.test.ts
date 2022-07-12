/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import welcome from '../routes/welcome.svelte';

describe('root', () => {
  it('should be rendered', async () => {
    const container = render(welcome);
    expect(container).toBeTruthy();
  });
});
