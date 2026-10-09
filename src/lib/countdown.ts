export type Countdown = { days: number; hours: number; minutes: number; seconds: number; complete: boolean };

export function getCountdown(target: string | Date, now = new Date()): Countdown {
  const remaining = Math.max(0, new Date(target).getTime() - now.getTime());
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    complete: remaining === 0
  };
}
