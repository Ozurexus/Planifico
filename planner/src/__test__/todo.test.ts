/**
 * @jest-environment jsdom
 */

 import todo from "../routes/todo.svelte";
 import { render } from "@testing-library/svelte";

describe("root", () => {
    it("should be rendered", async () => {
      const container = render(todo);
      expect(container).toBeTruthy();
    });
});