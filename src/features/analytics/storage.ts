export const analyticsEvents = ["page_view", "rsvp_submit", "calendar_add", "ai_question", "media_upload", "wish_post", "guest_check_in"] as const;
export type AnalyticsEventName = typeof analyticsEvents[number];
export type AnalyticsEvent = { id: string; name: AnalyticsEventName; occurredAt: string; path?: string };
const KEY = "my40plus:analytics";

export function readAnalytics(storage: Pick<Storage, "getItem"> = window.localStorage): AnalyticsEvent[] { try { const value = storage.getItem(KEY); return value ? JSON.parse(value) as AnalyticsEvent[] : []; } catch { return []; } }
export function trackEvent(name: AnalyticsEventName, path?: string, storage: Pick<Storage, "getItem" | "setItem"> = window.localStorage): AnalyticsEvent[] { const next = [...readAnalytics(storage), { id: crypto.randomUUID(), name, path, occurredAt: new Date().toISOString() }]; storage.setItem(KEY, JSON.stringify(next)); return next; }
export function analyticsSummary(events: AnalyticsEvent[]) { return Object.fromEntries(analyticsEvents.map(name => [name, events.filter(event => event.name === name).length])) as Record<AnalyticsEventName, number>; }
