/**
 * @jest-environment jsdom
 */

import ButtonSignOut from "../lib/ButtonSignOut.svelte";
import { render } from "@testing-library/svelte";

test("Button exist", () => {
    const { getByRole } = render(ButtonSignOut);
    const button = getByRole("button");
    expect(button).toBeVisible();
  });