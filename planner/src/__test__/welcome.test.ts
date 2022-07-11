/**
 * @jest-environment jsdom
 */

 import welcome from "../routes/welcome.svelte";
 import { render } from "@testing-library/svelte";

describe("root", () => {
    it("should be rendered", async () => {
      const container = render(welcome);
      expect(container).toBeTruthy();
    });
});