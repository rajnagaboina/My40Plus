import manifest from "./manifest";

it("defines an installable standalone PWA with regular and maskable icons", () => {
  const value = manifest();
  expect(value.display).toBe("standalone");
  expect(value.start_url).toBe("/");
  expect(value.icons).toEqual(expect.arrayContaining([expect.objectContaining({ purpose: "maskable" })]));
});
