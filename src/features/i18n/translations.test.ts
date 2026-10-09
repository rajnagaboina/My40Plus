import { translations } from "./translations";

it("keeps the navigation keys available in both languages", () => {
  expect(Object.keys(translations.te).sort()).toEqual(Object.keys(translations.en).sort());
  expect(translations.te.home).not.toBe(translations.en.home);
});
