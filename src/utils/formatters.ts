export const formatCNPJ = (cnpj: string) => {
  // Remove any non-digit characters
  const digits = cnpj.replace(/\D/g, '');
  
  // Add formatting
  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
};