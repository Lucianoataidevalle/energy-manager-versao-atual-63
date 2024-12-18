export const formatNumber = (value: number) => {
  return value.toLocaleString('pt-BR', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
};

export const formatCNPJ = (cnpj: string) => {
  // Remove any non-digit characters
  const digits = cnpj.replace(/\D/g, '');
  
  // Format as XX.XXX.XXX/XXXX-XX
  return digits.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
};