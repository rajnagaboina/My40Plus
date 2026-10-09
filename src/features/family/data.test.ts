import { familyMembers } from "./data";
it("uses unique relationship nodes linked to the honoree", () => { expect(new Set(familyMembers.map(item => item.id)).size).toBe(familyMembers.length); expect(familyMembers.filter(item => item.parentId).every(item => item.parentId === "lakshmi")).toBe(true); });
