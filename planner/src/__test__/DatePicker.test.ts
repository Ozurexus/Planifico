/**
 * @jest-environment jsdom
 */

 import DatePicker from "../lib/DatePicker.svelte";
 import { render } from "@testing-library/svelte";

test("Checking textContent", () => {
    // 1) Get container
    // 2) Using querySelectorAll and forEach check whether the text content is equal
    
    const content = ["Choose a date", "Start time:", "End time:"]
    let cur = 0;
    const { container} = render(DatePicker);
    container.querySelectorAll("p").forEach(elem => {
        expect(elem.textContent).toEqual(content[cur]);
        cur += 1;
    })
});