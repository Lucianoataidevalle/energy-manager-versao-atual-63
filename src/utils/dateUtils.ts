
import { format, parse, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatMonthYear = (date: Date) => {
  return format(date, "MMM/yy", { locale: ptBR });
};

export const parseMonthString = (monthString: string) => {
  if (!monthString) return new Date();
  try {
    return parse(monthString, 'yyyy-MM', new Date());
  } catch (error) {
    console.error('Error parsing date:', monthString);
    return new Date();
  }
};

export const getLast3Months = (selectedMonth: string) => {
  const selectedDate = parseMonthString(selectedMonth);
  return Array.from({ length: 3 }, (_, i) => {
    const date = subMonths(selectedDate, i);
    return format(date, 'yyyy-MM');
  }).reverse();
};

export const getLast12Months = (selectedMonth: string) => {
  const selectedDate = parseMonthString(selectedMonth);
  return Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(selectedDate, i);
    return format(date, 'yyyy-MM');
  }).reverse();
};

export const getMonthsByScreenSize = (selectedMonth: string) => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return getLast3Months(selectedMonth);
  }
  return getLast12Months(selectedMonth);
};

export const isValidDate = (date: Date) => {
  return date instanceof Date && !isNaN(date.getTime());
};
