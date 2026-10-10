import { validTravelDate } from './quote-input.ts';

export function dateValue(date: Date): string {
  // The initial departure suggestion follows the user's local calendar.
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function addDays(value: string, days: number): string {
  if (!validTravelDate(value) || !Number.isInteger(days)) return '';
  const date = new Date(`${value}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
export function longDate(value: string): string {
  if (!validTravelDate(value)) return 'Choose a valid date';
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}
