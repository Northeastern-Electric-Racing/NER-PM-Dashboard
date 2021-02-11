import { findIdx } from "./Main";

test("find index of number in array", () => {
  expect(findIdx(3, [5, 4, 3, 0, 3])).toBe(2);
});

test("find index of String in array", () => {
  expect(
    findIdx("Hello", ["first", "second", "hello ", "Hello", "fifth"])
  ).toBe(3);
});

test("find index of String not in array", () => {
  expect(() =>
    findIdx("hello", ["first", "second", "hello ", "Hello", "fifth"])
  ).toThrow("Item not found in array");
});
