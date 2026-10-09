export type FamilyMember = { id: string; relation: string; name: string; note: string; parentId?: string };
export const familyMembers: FamilyMember[] = [
  { id: "lakshmi", relation: "Honoree", name: "Lakshmi Srujana Gutta", note: "The heart of this celebration" },
  { id: "parents", relation: "Parents", name: "Names coming soon", note: "Family stories and photos coming soon", parentId: "lakshmi" },
  { id: "siblings", relation: "Siblings", name: "Names coming soon", note: "Shared memories coming soon", parentId: "lakshmi" },
  { id: "spouse", relation: "Spouse", name: "Name coming soon", note: "Their story coming soon", parentId: "lakshmi" },
  { id: "children", relation: "Children", name: "Names coming soon", note: "Family memories coming soon", parentId: "lakshmi" }
];
