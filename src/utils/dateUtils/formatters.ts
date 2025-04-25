
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Formats a date object to display as month/year in Brazilian Portuguese format (e.g. "Jan/23").
 */
export const formatMonthYear = (date: Date) => {
  return format(date, "MMM/yy", { locale: ptBR });
};

/**
 * Parses a month string in the format 'yyyy-MM' into a Date object.
 * Returns current date if the string is invalid or empty.
 */
export const parseMonthString = (monthString: string) => {
  if (!monthString) return new Date();
  try {
    return parse(monthString, 'yyyy-MM', new Date());
  } catch (error) {
    console.error('Error parsing date:', monthString);
    return new Date();
  }
};

/**
 * Validates if a date object is valid.
 */
export const isValidDate = (date: Date) => {
  return date instanceof Date && !isNaN(date.getTime());
};
