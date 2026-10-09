export type ContentSection = "invitation" | "timeline" | "schedule" | "family" | "knowledge";
const KEY = "my40plus:content-drafts";
export type ContentDrafts = Partial<Record<ContentSection, string>>;
export function readContentDrafts(storage: Pick<Storage, "getItem"> = window.localStorage): ContentDrafts { try { const raw = storage.getItem(KEY); return raw ? JSON.parse(raw) as ContentDrafts : {}; } catch { return {}; } }
export function saveContentDraft(section: ContentSection, content: string, storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage): ContentDrafts { const next = { ...readContentDrafts(storage), [section]: content }; storage.setItem(KEY, JSON.stringify(next)); return next; }
