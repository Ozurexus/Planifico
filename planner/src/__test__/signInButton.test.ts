/**
 * @jest-environment jsdom
 */

 import ButtonSignIn from "../lib/ButtonSignIn.svelte";
 import { render } from "@testing-library/svelte";

test("Button exist", () => {
    const { getByRole } = render(ButtonSignIn);
    const button = getByRole("button");
    expect(button).toBeVisible();
  });