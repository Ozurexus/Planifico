/**
 * @jest-environment jsdom
 */

import index from '../routes/index.svelte';
import { render } from '@testing-library/svelte';

describe('root', () => {
	it('should be rendered', async () => {
		const container = render(index);
		expect(container).toBeTruthy();
	});
});
