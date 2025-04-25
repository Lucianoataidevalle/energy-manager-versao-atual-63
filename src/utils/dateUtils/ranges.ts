
import { format, subMonths } from "date-fns";
import { parseMonthString } from "./formatters";

/**
 * Gets the last 3 months from the selected month.
 */
export const getLast3Months = (selectedMonth: string) => {
  const selectedDate = parseMonthString(selectedMonth);
  return Array.from({ length: 3 }, (_, i) => {
    const date = subMonths(selectedDate, i);
    return format(date, 'yyyy-MM');
  }).reverse();
};

/**
 * Gets the last 12 months from the selected month.
 */
export const getLast12Months = (selectedMonth: string) => {
  const selectedDate = parseMonthString(selectedMonth);
  return Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(selectedDate, i);
    return format(date, 'yyyy-MM');
  }).reverse();
};

/**
 * Returns the appropriate number of months based on screen size.
 * Currently always returns 12 months for consistency between desktop and mobile.
 */
export const getMonthsByScreenSize = (selectedMonth: string) => {
  return getLast12Months(selectedMonth);
};
