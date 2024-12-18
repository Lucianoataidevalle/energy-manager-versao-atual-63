export const formatNumberInput = (value: string): string => {
  // Remove any non-digit characters except comma and dot
  let cleanValue = value.replace(/[^\d,.-]/g, '');
  
  // Replace dots with nothing (remove thousand separators)
  cleanValue = cleanValue.replace(/\./g, '');
  
  // Replace comma with dot for decimal
  cleanValue = cleanValue.replace(',', '.');
  
  // Parse to number and format back to string with proper separators
  const number = parseFloat(cleanValue);
  
  if (isNaN(number)) return '';
  
  // Format with Brazilian number format (thousands with dot, decimal with comma)
  return number.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const parseFormattedNumber = (value: string): number => {
  if (!value) return 0;
  
  // Remove thousand separators and replace decimal comma with dot
  const cleanValue = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(cleanValue) || 0;
};