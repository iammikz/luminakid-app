import { format, parseISO, subMonths } from "date-fns";

export function formatBirthDate(value: string): string {
  return format(parseISO(value), "MMM d, yyyy");
}

export function getBirthDateBounds(now = new Date()): { minDate: string; maxDate: string } {
  return {
    minDate: format(subMonths(now, 24), "yyyy-MM-dd"),
    maxDate: format(now, "yyyy-MM-dd")
  };
}
