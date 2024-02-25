/**
 * Parse a date format string into an array of date parts using Python's
 * `strptime` directive.
 * @param format
 */
export function parseFormat(format: string): string[] | null {
  return format.match(/%./g) as string[] | null;
}
