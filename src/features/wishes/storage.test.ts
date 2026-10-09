import { addWish, reactToWish } from "./storage";

function memoryStorage() {
  const values = new Map<string, string>();
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) };
}

it("adds a wish and retains the welcome message", () => {
  const storage = memoryStorage();
  const wishes = addWish({ author: "A Friend", message: "Happy birthday!" }, storage);
  expect(wishes[0]).toMatchObject({ author: "A Friend", reactions: 0 });
  expect(wishes).toHaveLength(2);
});

it("increments only the selected wish reaction", () => {
  const storage = memoryStorage();
  const [wish] = addWish({ author: "A Friend", message: "Wonderful wishes" }, storage);
  expect(reactToWish(wish.id, storage).find(item => item.id === wish.id)?.reactions).toBe(1);
});
