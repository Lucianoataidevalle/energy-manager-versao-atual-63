import { format, subMonths, parse, isValid } from "date-fns";
import { useEffect, useState } from "react";

export const useChartData = (selectedMonth: string, data: any[]) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768; // md breakpoint
  const monthsToShow = isMobile ? 3 : 12;

  const getLimitedMonthsData = () => {
    const selectedDate = parse(selectedMonth, 'yyyy-MM', new Date());
    if (!isValid(selectedDate)) {
      console.error('Invalid date:', selectedMonth);
      return [];
    }

    const months = Array.from({ length: monthsToShow }, (_, i) => {
      const date = subMonths(selectedDate, i);
      return format(date, 'yyyy-MM');
    }).reverse();

    return months;
  };

  return {
    months: getLimitedMonthsData(),
    isMobile
  };
};