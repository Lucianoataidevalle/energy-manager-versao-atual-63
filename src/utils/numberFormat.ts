export const formatNumberInput = (value: string): string => {
  // Remove any non-digit characters except comma, dot, and minus sign
  let cleanValue = value.replace(/[^\d,.-]/g, '');
  
  // Handle negative numbers
  const isNegative = cleanValue.startsWith('-');
  if (isNegative) {
    cleanValue = cleanValue.substring(1);
  }

  // Split into integer and decimal parts using comma
  const parts = cleanValue.split(',');
  let integerPart = parts[0].replace(/\./g, ''); // Remove existing dots
  const decimalPart = parts[1] || '';

  // Add thousand separators
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Combine parts
  let formattedValue = integerPart;
  if (decimalPart !== '') {
    formattedValue += ',' + decimalPart;
  }

  // Add negative sign if necessary
  if (isNegative) {
    formattedValue = '-' + formattedValue;
  }

  return formattedValue;
};

export const parseFormattedNumber = (value: string): number => {
  if (!value) return 0;
  
  // Remove thousand separators and replace decimal comma with dot
  const normalizedValue = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(normalizedValue) || 0;
};