test("to number", () => {
  expect(2 + 2).toBe(4);
  expect(2 + 3).toBe(5);
});

test("to object", () => {
  expect({ name: "liu" }).toEqual({ name: "liu" });
});

test("adding positive numbers is not zero", () => {
  expect(1 + 2).not.toBe(1);
});

test("true or false", () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});
