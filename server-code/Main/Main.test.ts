import { findIdx } from "./Main";

test("find index of array", () => {
  expect(findIdx(3, [5, 4, 3, 0, 3])).toBe(2);
});

test("find index of array", () => {
  expect(
    findIdx("Hello", ["first", "second", "hello ", "Hello", "fifth"])
  ).toBe(3);
});
